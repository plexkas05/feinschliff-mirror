"use client"
import { z } from "zod"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Mail, Sparkles, Truck, CheckCircle2, Store, Clock, ArrowRight, Zap, Loader2, MapPin, Phone } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"


// Service definitions
const services = [
  {
    id: "grundschliff",
    name: "Grundschliff",
    subtitle: "Kleines Messer",
    price: 12,
    type: "single" as const,
  },
  {
    id: "meisterschliff",
    name: "Meisterschliff",
    subtitle: "Großes Messer",
    price: 16,
    type: "single" as const,
  },
  {
    id: "kombi",
    name: "Kombi-Schliff",
    subtitle: "5 Messer Paket",
    price: 50,
    type: "package" as const,
  },
  {
    id: "feinschliff",
    name: "Der Feinschliff",
    subtitle: "15 Messer Paket",
    price: 120,
    type: "package" as const,
  },
]

// Liste aller PLZ im Umkreis von ca. 20km um Seiersberg (8054)
const ALLOWED_ZIPS = [
  "8010", "8020", "8036", "8041", "8042", "8043", "8044", "8045", "8046", "8047", "8051", "8052", "8053", "8054", "8055",
  "8073", "8074", "8141", "8142", "8143", "8144", "8401", "8501", "8502", "8151", "8152",
];

function isAddressInRadius(zipCode: string): boolean {
  return ALLOWED_ZIPS.includes(zipCode);
}




export function SlotRegistration() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")

  // NEW: Address & Phone State
  const [address, setAddress] = useState("")
  const [zipCity, setZipCity] = useState("")
  const [phone, setPhone] = useState("") // Neue State-Variable

  const [serviceId, setServiceId] = useState("grundschliff")
  const [deliveryOption, setDeliveryOption] = useState<"selbst" | "abholung">("selbst")

  const [isLoading, setIsLoading] = useState(false)

  // Get current service
  const currentService = services.find((s) => s.id === serviceId) || services[0]
  const deliveryCost = deliveryOption === "abholung" ? 8 : 0
  const totalPrice = currentService.price + deliveryCost

  // Completion date calculation
  const completionInfo = useMemo(() => {
    if (!date) return null

    const startDate = new Date(date)
    const daysToAdd = currentService.type === "single" ? 3 : 7
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + daysToAdd)

    return {
      dateString: endDate.toLocaleDateString("de-DE", { day: "numeric", month: "long" }),
      days: daysToAdd,
    }
  }, [date, currentService.type])

  // Supabase Booking Logic
  const handleBooking = async () => {
    
    // ZOD VALIDIERUNG (Echte Daten prüfen) 
    // A) Immer prüfen: E-Mail und Datum
    const baseSchema = z.object({
      email: z.string().email("Bitte eine gültige E-Mail-Adresse eingeben."),
      
      date: z.string()
        .min(1, "Bitte wähle ein Datum aus.")
        .refine((val) => new Date(val) >= new Date(new Date().setHours(0,0,0,0)), {
          message: "Das Datum darf nicht in der Vergangenheit liegen."
        })
    })
    
    const baseResult = baseSchema.safeParse({ email, date })
    
    if (!baseResult.success) {
      // Zeige den ersten Fehler der E-Mail/Datum Validierung an
      alert(baseResult.error.issues[0].message)
      return; // STOPP
    }

    // B) Nur bei "Abholung" prüfen: Adresse, PLZ & Telefon
    let extractedZip = ""; // Vorher deklarieren, damit wir sie für den Range-Check haben

    if (deliveryOption === "abholung") {
      extractedZip = zipCity.split(" ")[0].trim();

      const pickupSchema = z.object({
        address: z.string().min(3, "Bitte gib eine Straße und Hausnummer an."),
        zip: z.string().length(4, "Die PLZ muss genau 4 Zahlen haben.").regex(/^\d+$/, "Die PLZ darf nur aus Zahlen bestehen."),
        phone: z.string().min(8, "Bitte gib eine gültige Telefonnummer an.").regex(/^(\+43|0)\d+$/, "Telefonnummer ungültig (z.B. 0664...)")
      })

      const pickupResult = pickupSchema.safeParse({
        address: address,
        zip: extractedZip,
        phone: phone
      })

      if (!pickupResult.success) {
        // Zeige den ersten Fehler der Abhol-Validierung an (z.B. falsche Nummer)
        alert(pickupResult.error.issues[0].message)
        return; // STOPP
      }
    }
    // 2. RANGE CHECK (PLZ Radius) 
    
    if (deliveryOption === "abholung" && !ALLOWED_ZIPS.includes(extractedZip)) {
      alert("Tut uns leid! Der Abholservice ist nur im Raum Graz & Umgebung (20km) verfügbar. Bitte wähle 'Selbstabgabe' und lass uns die Messer zukommen, oder gib eine gültige PLZ im Raum Graz & Umgebung ein.")
      return; // STOPP
    }

    // 3. DATEN SENDEN (Supabase & Mail) 
    setIsLoading(true)

    try {
      const fullAddress = deliveryOption === "abholung" ? `${address}, ${zipCity}` : null
      const phoneNumber = deliveryOption === "abholung" ? phone : null
      
      // Daten an Supabase senden
      if (!supabase) throw new Error("Supabase ist nicht konfiguriert.")
      const { data, error } = await supabase
        .from('bookings')
        .insert([
          {
            email: email,
            service_id: currentService.id,
            service_name: currentService.name,
            delivery_option: deliveryOption,
            booking_date: date,
            price: totalPrice,
            status: 'pending',
            address: fullAddress,
            phone: phoneNumber 
          },
        ])
        .select()

      if (error) throw error

      // E-Mail senden (API Route)
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          serviceName: currentService.name,
          date: new Date(date).toLocaleDateString("de-DE"),
          price: totalPrice,
          deliveryOption: deliveryOption,
          address: fullAddress,
          phone: phoneNumber 
        })
      });

      // Erfolg -> Weiterleitung
      const formattedDate = new Date(date).toLocaleDateString("de-DE")
      const params = new URLSearchParams({
        date: formattedDate,
        service: currentService.name,
        price: totalPrice.toString(),
        email: email
      })
      router.push(`/success?${params.toString()}`)

    } catch (error) {
      console.error('Error inserting booking:', error)
      alert("Es gab einen Fehler bei der Buchung. Bitte versuche es später noch einmal.")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <section id="termin" className="relative -mt-1 min-h-screen w-full px-4 py-12 lg:py-20 overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-emerald-50 rounded-full blur-[120px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-slate-100 rounded-full blur-[100px] opacity-50 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white px-3 py-1.5 text-xs lg:text-sm text-slate-600 mb-5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]"
          >
            <Clock className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
            Schnelle Terminbuchung
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-slate-900"
          >
            Termin buchen
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-base lg:text-xl max-w-xl mx-auto"
          >
            Wähle deinen Service und buche in unter 60 Sekunden.
          </motion.p>
        </div>

        {/* Split View Layout */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">

          {/* Left Side: Controls */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Service Selection */}
            <div className="space-y-3">
              <Label className="text-sm lg:text-lg font-semibold flex items-center gap-2 text-slate-800">
                <Sparkles className="h-4 w-4 text-slate-600" />
                Was möchtest du schleifen lassen?
              </Label>
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setServiceId(service.id)}
                    className={`
                      relative cursor-pointer rounded-xl border-2 p-4 lg:p-6 transition-all duration-300
                      ${serviceId === service.id
                        ? "border-slate-900 bg-slate-50 shadow-md"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                      }
                    `}
                  >
                    {serviceId === service.id && (
                      <motion.div layoutId="service-check" className="absolute top-3 right-3">
                        <CheckCircle2 className="h-5 w-5 lg:h-5 lg:w-5 text-emerald-600" />
                      </motion.div>
                    )}
                    <h3 className="font-semibold text-base lg:text-lg text-slate-800 mb-0.5">{service.name}</h3>
                    <p className="text-xs lg:text-sm text-slate-500">{service.subtitle}</p>
                    <p className="mt-2 text-xl lg:text-2xl font-bold text-slate-900">{service.price}€</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Delivery Options */}
            <div className="space-y-3">
              <Label className="text-sm lg:text-lg font-semibold flex items-center gap-2 text-slate-800">
                <Truck className="h-4 w-4 text-slate-600" />
                Wie kommen die Messer zu mir?
              </Label>
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeliveryOption("selbst")}
                  className={`
                    relative cursor-pointer rounded-xl border-2 p-3 lg:p-5 transition-all duration-300
                    ${deliveryOption === "selbst"
                      ? "border-slate-900 bg-slate-50 shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                    }
                  `}
                >
                  {deliveryOption === "selbst" && (
                    <motion.div layoutId="delivery-check" className="absolute top-3 right-3">
                      <CheckCircle2 className="h-5 w-5 lg:h-5 lg:w-5 text-emerald-600" />
                    </motion.div>
                  )}
                  <Store
                    className={`h-5 w-5 lg:h-7 lg:w-7 mb-2 ${deliveryOption === "selbst" ? "text-slate-800" : "text-slate-400"}`}
                  />
                  <h3 className="font-semibold text-sm lg:text-base text-slate-800">Selbstabgabe</h3>
                  <p className="text-xs text-slate-500">Du bringst sie vorbei</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-600">Kostenlos</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeliveryOption("abholung")}
                  className={`
                    relative cursor-pointer rounded-xl border-2 p-3 lg:p-5 transition-all duration-300
                    ${deliveryOption === "abholung"
                      ? "border-slate-900 bg-slate-50 shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                    }
                  `}
                >
                  {deliveryOption === "abholung" && (
                    <motion.div layoutId="delivery-check" className="absolute top-3 right-3">
                      <CheckCircle2 className="h-5 w-5 lg:h-5 lg:w-5 text-emerald-600" />
                    </motion.div>
                  )}
                  <Truck
                    className={`h-5 w-5 lg:h-7 lg:w-7 mb-2 ${deliveryOption === "abholung" ? "text-slate-800" : "text-slate-400"}`}
                  />
                  <h3 className="font-semibold text-sm lg:text-base text-slate-800">Hol & Bring</h3>
                  <p className="text-xs text-slate-500">Bequem von zuhause</p>
                  <p className={`mt-1 text-sm font-semibold ${deliveryOption === "abholung" ? "text-slate-900" : "text-slate-400"}`}>+ 8€</p>
                </motion.div>
              </div>
            </div>

            {/* ADRESS & TELEFON FELDER (Jetzt mit Telefon!) */}
            <AnimatePresence>
              {deliveryOption === "abholung" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 overflow-hidden"
                >
                  <Label className="text-sm lg:text-lg font-semibold flex items-center gap-2 text-slate-800">
                    <MapPin className="h-4 w-4 text-slate-600" />
                    Abholadresse & Kontakt
                  </Label>
                  <div className="grid gap-3">
                    <Input
                      placeholder="Straße & Hausnummer"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="h-10 lg:h-12 text-sm lg:text-base bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-slate-400"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="PLZ & Ort"
                        value={zipCity}
                        onChange={(e) => setZipCity(e.target.value)}
                        className="h-10 lg:h-12 text-sm lg:text-base bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-slate-400"
                      />
                      {/* NEUES TELEFON FELD */}
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          placeholder="Telefonnummer"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="pl-9 h-10 lg:h-12 text-sm lg:text-base bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-slate-400"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Date & Email Fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="date" className="text-sm lg:text-base font-medium flex items-center gap-2 text-slate-600">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {deliveryOption === "selbst" ? "Abgabedatum" : "Wunsch-Abholtag"}
                </Label>
                <Input
                  id="date"
                  type="date"
                  min={new Date().toISOString().split("T")[0]} // aktuelles datum als Minimum
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-10 lg:h-12 text-sm lg:text-base cursor-pointer bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-slate-400"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm lg:text-base font-medium flex items-center gap-2 text-slate-600">
                  <Mail className="h-4 w-4 text-slate-400" />
                  E-Mail Adresse
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="deine@email.at"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 lg:h-12 text-sm lg:text-base bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-slate-400"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Side: Live Ticket */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="lg:sticky lg:top-8">
              <div className="rounded-2xl border border-slate-200/60 bg-white shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] overflow-hidden">
                {/* Ticket Header */}
                <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 lg:px-6 lg:py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs lg:text-sm font-medium text-slate-500 uppercase tracking-wider">
                      Deine Buchung
                    </span>
                    <Zap className="h-4 w-4 text-amber-500 fill-amber-500/20" />
                  </div>
                </div>

                {/* Ticket Body */}
                <div className="p-5 lg:p-6 space-y-5">
                  {/* Service */}
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Service</span>
                    <motion.div layout className="flex items-center justify-between text-slate-800">
                      <span className="font-semibold text-sm lg:text-lg">{currentService.name}</span>
                      <span className="font-bold text-sm lg:text-lg text-slate-900">{currentService.price}€</span>
                    </motion.div>
                    <span className="text-xs lg:text-sm text-slate-500">{currentService.subtitle}</span>
                  </div>

                  <div className="h-px bg-slate-100" />

                  {/* Delivery */}
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Übergabe</span>
                    <motion.div layout className="flex items-center justify-between text-slate-800">
                      <span className="text-sm lg:text-base">
                        {deliveryOption === "selbst" ? "Selbstabgabe" : "Hol & Bring Service"}
                      </span>
                      <span
                        className={`font-semibold text-sm lg:text-base ${deliveryCost === 0 ? "text-emerald-600" : "text-slate-900"}`}
                      >
                        {deliveryCost === 0 ? "Gratis" : `+${deliveryCost}€`}
                      </span>
                    </motion.div>
                  </div>

                  <div className="h-px bg-slate-100" />

                  {/* Completion Date HUD */}
                  <AnimatePresence mode="wait">
                    {completionInfo ? (
                      <motion.div
                        key="completion"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 lg:p-4"
                      >
                        <span className="text-xs text-emerald-700 font-medium uppercase tracking-wider">
                          {deliveryOption === "selbst" ? "Abholbereit" : "Lieferbereit"}
                        </span>
                        <motion.p
                          key={completionInfo.dateString}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-lg lg:text-2xl font-bold text-slate-900 mt-1"
                        >
                          {completionInfo.dateString}
                        </motion.p>
                        <span className="text-xs text-slate-500">
                          ca. {completionInfo.days} Werktage
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="rounded-xl bg-slate-50 border border-dashed border-slate-200 p-3 lg:p-4 text-center"
                      >
                        <Calendar className="h-6 w-6 lg:h-7 lg:w-7 mx-auto mb-2 text-slate-300" />
                        <p className="text-xs lg:text-sm text-slate-400">Wähle ein Datum</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Ticket Footer */}
                <div className="border-t border-slate-200 bg-slate-50 p-5 lg:p-6">
                  <div className="flex items-center justify-between mb-4 text-slate-900">
                    <span className="text-sm lg:text-lg font-medium">Gesamt</span>
                    <motion.span
                      key={totalPrice}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      className="text-xl lg:text-3xl font-bold"
                    >
                      {totalPrice}€
                    </motion.span>
                  </div>

                  {/* Button */}
                  <Button
                    size="lg"
                    disabled={isLoading}
                    className="w-full h-10 lg:h-12 text-sm lg:text-base font-semibold gap-2 bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                    onClick={handleBooking}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Wird gebucht...
                      </>
                    ) : (
                      <>
                        Jetzt buchen
                        <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  Antwort binnen 24h
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-slate-400" />
                  Profischliff
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

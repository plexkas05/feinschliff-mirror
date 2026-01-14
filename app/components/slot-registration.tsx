"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Mail, Sparkles, Truck, CheckCircle2, Store, Clock, ArrowRight, Zap, Loader2 } from "lucide-react"
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
    icon: "🔪",
  },
  {
    id: "meisterschliff",
    name: "Meisterschliff",
    subtitle: "Großes Messer",
    price: 16,
    type: "single" as const,
    icon: "🗡️",
  },
  { id: "kombi", name: "Kombi-Schliff", subtitle: "5 Messer Paket", price: 50, type: "package" as const, icon: "📦" },
  {
    id: "feinschliff",
    name: "Der Feinschliff",
    subtitle: "15 Messer Paket",
    price: 120,
    type: "package" as const,
    icon: "✨",
  },
]

export function SlotRegistration() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [serviceId, setServiceId] = useState("grundschliff")
  const [deliveryOption, setDeliveryOption] = useState<"selbst" | "abholung">("selbst")
  
  // Loading State
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
    // 1. Validierung
    if (!email || !date) {
      alert("Bitte gib eine E-Mail-Adresse und ein Datum an.")
      return
    }

    setIsLoading(true)

    try {
      // 2. Daten an Supabase senden
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
            status: 'pending' // Standard-Status
          },
        ])
        .select()

      if (error) throw error

      // 3. Erfolg -> Weiterleitung
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
    <section id="termin" className="relative -mt-1 min-h-screen w-full px-4 py-12 lg:py-20 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Header - MATCHING 'HOW IT WORKS' & 'PRICING' EXACTLY */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs lg:text-sm text-slate-300 mb-5 backdrop-blur-sm"
          >
            <Clock className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
            Schnelle Terminbuchung
          </motion.div>
          
          {/* UPDATED: text-4xl/5xl/6xl to match other sections */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-white"
          >
            Termin buchen
          </motion.h2>
          
          {/* UPDATED: text-base/lg/xl to match other sections */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base lg:text-xl max-w-xl mx-auto"
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
              <Label className="text-sm lg:text-lg font-semibold flex items-center gap-2 text-slate-200">
                <Sparkles className="h-4 w-4 text-white" />
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
                      relative cursor-pointer rounded-xl border-2 p-3 lg:p-5 transition-all duration-300 backdrop-blur-sm
                      ${
                        serviceId === service.id
                          ? "border-white bg-slate-900/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                          : "border-white/10 bg-slate-900/40 hover:border-white/20 hover:bg-slate-800/60"
                      }
                    `}
                  >
                    {serviceId === service.id && (
                      <motion.div layoutId="service-check" className="absolute top-3 right-3">
                        <CheckCircle2 className="h-5 w-5 lg:h-5 lg:w-5 text-white" />
                      </motion.div>
                    )}
                    <div className="text-xl lg:text-2xl mb-2">{service.icon}</div>
                    <h3 className="font-semibold text-sm lg:text-base text-slate-200">{service.name}</h3>
                    <p className="text-xs text-slate-400">{service.subtitle}</p>
                    <p className="mt-1 text-lg lg:text-xl font-bold text-white">{service.price}€</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Delivery Options */}
            <div className="space-y-3">
              <Label className="text-sm lg:text-lg font-semibold flex items-center gap-2 text-slate-200">
                <Truck className="h-4 w-4 text-white" />
                Wie kommen die Messer zu mir?
              </Label>
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeliveryOption("selbst")}
                  className={`
                    relative cursor-pointer rounded-xl border-2 p-3 lg:p-5 transition-all duration-300 backdrop-blur-sm
                    ${
                      deliveryOption === "selbst"
                        ? "border-white bg-slate-900/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        : "border-white/10 bg-slate-900/40 hover:border-white/20 hover:bg-slate-800/60"
                    }
                  `}
                >
                  {deliveryOption === "selbst" && (
                    <motion.div layoutId="delivery-check" className="absolute top-3 right-3">
                      <CheckCircle2 className="h-5 w-5 lg:h-5 lg:w-5 text-white" />
                    </motion.div>
                  )}
                  <Store
                    className={`h-5 w-5 lg:h-7 lg:w-7 mb-2 ${deliveryOption === "selbst" ? "text-white" : "text-slate-500"}`}
                  />
                  <h3 className="font-semibold text-sm lg:text-base text-slate-200">Selbstabgabe</h3>
                  <p className="text-xs text-slate-400">Du bringst sie vorbei</p>
                  <p className="mt-1 text-sm font-semibold text-emerald-400">Kostenlos</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeliveryOption("abholung")}
                  className={`
                    relative cursor-pointer rounded-xl border-2 p-3 lg:p-5 transition-all duration-300 backdrop-blur-sm
                    ${
                      deliveryOption === "abholung"
                        ? "border-white bg-slate-900/40 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        : "border-white/10 bg-slate-900/40 hover:border-white/20 hover:bg-slate-800/60"
                    }
                  `}
                >
                  {deliveryOption === "abholung" && (
                    <motion.div layoutId="delivery-check" className="absolute top-3 right-3">
                      <CheckCircle2 className="h-5 w-5 lg:h-5 lg:w-5 text-white" />
                    </motion.div>
                  )}
                  <Truck
                    className={`h-5 w-5 lg:h-7 lg:w-7 mb-2 ${deliveryOption === "abholung" ? "text-white" : "text-slate-500"}`}
                  />
                  <h3 className="font-semibold text-sm lg:text-base text-slate-200">Hol & Bring</h3>
                  <p className="text-xs text-slate-400">Bequem von zuhause</p>
                  <p className={`mt-1 text-sm font-semibold ${deliveryOption === "abholung" ? "text-white" : "text-white/60"}`}>+ 8€</p>
                </motion.div>
              </div>
            </div>

            {/* Date & Email Fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="date" className="text-sm lg:text-base font-medium flex items-center gap-2 text-slate-300">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {deliveryOption === "selbst" ? "Abgabedatum" : "Abholtermin"}
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-10 lg:h-12 text-sm lg:text-base cursor-pointer bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500 focus:border-white/50 [transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:-webkit-text-fill-color:white [&:-webkit-autofill]:bg-transparent"
                  style={{ colorScheme: "dark" }}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm lg:text-base font-medium flex items-center gap-2 text-slate-300">
                  <Mail className="h-4 w-4 text-slate-400" />
                  E-Mail Adresse
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="deine@email.at"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 lg:h-12 text-sm lg:text-base bg-slate-900/50 border-white/10 text-white placeholder:text-slate-500 focus:border-white/50 [transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:-webkit-text-fill-color:white [&:-webkit-autofill]:bg-transparent"
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
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md shadow-2xl overflow-hidden">
                {/* Ticket Header */}
                <div className="bg-white/5 border-b border-white/10 px-5 py-3 lg:px-6 lg:py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs lg:text-sm font-medium text-slate-400 uppercase tracking-wider">
                      Deine Buchung
                    </span>
                    <Zap className="h-4 w-4 text-amber-300 fill-amber-300/20" />
                  </div>
                </div>

                {/* Ticket Body */}
                <div className="p-5 lg:p-6 space-y-5">
                  {/* Service */}
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Service</span>
                    <motion.div layout className="flex items-center justify-between text-slate-200">
                      <span className="font-semibold text-sm lg:text-lg">{currentService.name}</span>
                      <span className="font-bold text-sm lg:text-lg text-white">{currentService.price}€</span>
                    </motion.div>
                    <span className="text-xs lg:text-sm text-slate-400">{currentService.subtitle}</span>
                  </div>

                  <div className="h-px bg-white/10" />

                  {/* Delivery */}
                  <div className="space-y-1">
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Übergabe</span>
                    <motion.div layout className="flex items-center justify-between text-slate-200">
                      <span className="text-sm lg:text-base">
                        {deliveryOption === "selbst" ? "Selbstabgabe" : "Hol & Bring Service"}
                      </span>
                      <span
                        className={`font-semibold text-sm lg:text-base ${deliveryCost === 0 ? "text-emerald-400" : "text-white"}`}
                      >
                        {deliveryCost === 0 ? "Gratis" : `+${deliveryCost}€`}
                      </span>
                    </motion.div>
                  </div>

                  <div className="h-px bg-white/10" />

                  {/* Completion Date HUD */}
                  <AnimatePresence mode="wait">
                    {completionInfo ? (
                      <motion.div
                        key="completion"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="rounded-xl bg-slate-950/50 border border-white/20 p-3 lg:p-4"
                      >
                        <span className="text-xs text-slate-300 font-medium uppercase tracking-wider">
                          {deliveryOption === "selbst" ? "Abholbereit" : "Lieferbereit"}
                        </span>
                        <motion.p
                          key={completionInfo.dateString}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-lg lg:text-2xl font-bold text-white mt-1"
                        >
                          {completionInfo.dateString}
                        </motion.p>
                        <span className="text-xs text-slate-400">
                          ca. {completionInfo.days} Werktage
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="rounded-xl bg-white/5 border border-dashed border-white/10 p-3 lg:p-4 text-center"
                      >
                        <Calendar className="h-6 w-6 lg:h-7 lg:w-7 mx-auto mb-2 text-slate-600" />
                        <p className="text-xs lg:text-sm text-slate-500">Wähle ein Datum</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Ticket Footer */}
                <div className="border-t border-white/10 bg-slate-950/50 p-5 lg:p-6">
                  <div className="flex items-center justify-between mb-4 text-white">
                    <span className="text-sm lg:text-lg font-medium">Gesamt</span>
                    <motion.span
                      key={totalPrice}
                      initial={{ scale: 1.2, color: "white" }}
                      animate={{ scale: 1, color: "white" }}
                      className="text-xl lg:text-3xl font-bold"
                    >
                      {totalPrice}€
                    </motion.span>
                  </div>
                  
                  {/* Button mit Loading State - KOMPAKTER (h-10/12 und text-sm/base) */}
                  <Button
                    size="lg"
                    disabled={isLoading}
                    className="w-full h-10 lg:h-12 text-sm lg:text-base font-semibold gap-2 bg-white text-slate-950 hover:bg-slate-200 transition-colors"
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
                  <Sparkles className="h-3.5 w-3.5 text-white" />
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
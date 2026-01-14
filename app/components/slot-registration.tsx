"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Mail, Sparkles, Truck, CheckCircle2, Store, Clock, ArrowRight, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Service definitions
const services = [
  {
    id: "grundschliff",
    name: "Grundschliff",
    subtitle: "Messer bis 12cm",
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
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [serviceId, setServiceId] = useState("grundschliff")
  const [deliveryOption, setDeliveryOption] = useState<"selbst" | "abholung">("selbst")

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

  // Email generation
  const handleBooking = () => {
    const deliveryText = deliveryOption === "abholung" ? "Abhol- & Lieferservice (+8€)" : "Selbstabgabe (kostenlos)"
    const subject = `Buchung: ${currentService.name} für ${totalPrice}€`
    const body = `Hallo Felix,%0D%0A%0D%0AIch möchte gerne buchen:%0D%0A%0D%0A━━━━━━━━━━━━━━━━━━━━%0D%0A🔪 SERVICE: ${currentService.name}%0D%0A   ${currentService.subtitle} - ${currentService.price}€%0D%0A%0D%0A🚚 ÜBERGABE: ${deliveryText}%0D%0A%0D%0A📅 DATUM: ${date}%0D%0A%0D%0A💰 GESAMT: ${totalPrice}€%0D%0A━━━━━━━━━━━━━━━━━━━━%0D%0A%0D%0AMeine E-Mail: ${email}%0D%0A%0D%0ABitte um Bestätigung.`
    window.location.href = `mailto:felix.kastner27@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="termin" className="relative min-h-screen bg-background px-4 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm lg:text-base text-muted-foreground mb-6"
          >
            <Clock className="h-4 w-4 lg:h-5 lg:w-5" />
            Schnelle Terminbuchung
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            Termin buchen
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-base lg:text-xl max-w-xl mx-auto"
          >
            Wähle deinen Service und buche in unter 60 Sekunden.
          </motion.p>
        </div>

        {/* Split View Layout */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Side: Controls (3 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3 space-y-8"
          >
            {/* Service Selection - Card Grid */}
            <div className="space-y-4">
              <Label className="text-base lg:text-xl font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
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
                      ${
                        serviceId === service.id
                          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                          : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
                      }
                    `}
                  >
                    {serviceId === service.id && (
                      <motion.div layoutId="service-check" className="absolute top-3 right-3">
                        <CheckCircle2 className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
                      </motion.div>
                    )}
                    <div className="text-2xl lg:text-3xl mb-2">{service.icon}</div>
                    <h3 className="font-semibold text-sm lg:text-lg">{service.name}</h3>
                    <p className="text-xs lg:text-sm text-muted-foreground">{service.subtitle}</p>
                    <p className="mt-2 text-xl lg:text-2xl font-bold">{service.price}€</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Delivery Options - Toggle Cards */}
            <div className="space-y-4">
              <Label className="text-base lg:text-xl font-semibold flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                Wie kommen die Messer zu mir?
              </Label>
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeliveryOption("selbst")}
                  className={`
                    relative cursor-pointer rounded-xl border-2 p-4 lg:p-6 transition-all duration-300
                    ${
                      deliveryOption === "selbst"
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                        : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
                    }
                  `}
                >
                  {deliveryOption === "selbst" && (
                    <motion.div layoutId="delivery-check" className="absolute top-3 right-3">
                      <CheckCircle2 className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
                    </motion.div>
                  )}
                  <Store
                    className={`h-6 w-6 lg:h-8 lg:w-8 mb-2 ${deliveryOption === "selbst" ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <h3 className="font-semibold text-sm lg:text-lg">Selbstabgabe</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground">Du bringst sie vorbei</p>
                  <p className="mt-2 text-sm lg:text-base font-semibold text-emerald-600">Kostenlos</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDeliveryOption("abholung")}
                  className={`
                    relative cursor-pointer rounded-xl border-2 p-4 lg:p-6 transition-all duration-300
                    ${
                      deliveryOption === "abholung"
                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                        : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"
                    }
                  `}
                >
                  {deliveryOption === "abholung" && (
                    <motion.div layoutId="delivery-check" className="absolute top-3 right-3">
                      <CheckCircle2 className="h-5 w-5 lg:h-6 lg:w-6 text-primary" />
                    </motion.div>
                  )}
                  <Truck
                    className={`h-6 w-6 lg:h-8 lg:w-8 mb-2 ${deliveryOption === "abholung" ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <h3 className="font-semibold text-sm lg:text-lg">Hol & Bring</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground">Bequem von zuhause</p>
                  <p className="mt-2 text-sm lg:text-base font-semibold text-primary">+ 8€</p>
                </motion.div>
              </div>
            </div>

            {/* Date & Email Fields */}
            <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm lg:text-base font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  {deliveryOption === "selbst" ? "Abgabedatum" : "Abholtermin"}
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-12 lg:h-14 text-base lg:text-lg cursor-pointer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm lg:text-base font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  E-Mail Adresse
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="deine@email.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 lg:h-14 text-base lg:text-lg"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Side: Live Ticket (2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="lg:sticky lg:top-8">
              <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-2xl overflow-hidden">
                {/* Ticket Header */}
                <div className="bg-primary/5 border-b border-border px-6 py-4 lg:px-8 lg:py-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs lg:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      Deine Buchung
                    </span>
                    <Zap className="h-4 w-4 lg:h-5 lg:w-5 text-primary" />
                  </div>
                </div>

                {/* Ticket Body */}
                <div className="p-6 lg:p-8 space-y-6">
                  {/* Service */}
                  <div className="space-y-1">
                    <span className="text-xs lg:text-sm text-muted-foreground uppercase tracking-wider">Service</span>
                    <motion.div layout className="flex items-center justify-between">
                      <span className="font-semibold text-base lg:text-xl">{currentService.name}</span>
                      <span className="font-bold text-base lg:text-xl">{currentService.price}€</span>
                    </motion.div>
                    <span className="text-sm lg:text-base text-muted-foreground">{currentService.subtitle}</span>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Delivery */}
                  <div className="space-y-1">
                    <span className="text-xs lg:text-sm text-muted-foreground uppercase tracking-wider">Übergabe</span>
                    <motion.div layout className="flex items-center justify-between">
                      <span className="text-base lg:text-lg">
                        {deliveryOption === "selbst" ? "Selbstabgabe" : "Hol & Bring Service"}
                      </span>
                      <span
                        className={`font-semibold text-base lg:text-lg ${deliveryCost === 0 ? "text-emerald-600" : ""}`}
                      >
                        {deliveryCost === 0 ? "Gratis" : `+${deliveryCost}€`}
                      </span>
                    </motion.div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Completion Date HUD */}
                  <AnimatePresence mode="wait">
                    {completionInfo ? (
                      <motion.div
                        key="completion"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="rounded-xl bg-primary/10 border border-primary/20 p-4 lg:p-5"
                      >
                        <span className="text-xs lg:text-sm text-primary font-medium uppercase tracking-wider">
                          {deliveryOption === "selbst" ? "Abholbereit" : "Lieferbereit"}
                        </span>
                        <motion.p
                          key={completionInfo.dateString}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xl lg:text-3xl font-bold text-primary mt-1"
                        >
                          {completionInfo.dateString}
                        </motion.p>
                        <span className="text-xs lg:text-sm text-muted-foreground">
                          ca. {completionInfo.days} Werktage
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="rounded-xl bg-muted/50 border border-dashed border-border p-4 lg:p-5 text-center"
                      >
                        <Calendar className="h-6 w-6 lg:h-8 lg:w-8 mx-auto mb-2 text-muted-foreground/50" />
                        <p className="text-sm lg:text-base text-muted-foreground">Wähle ein Datum</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Ticket Footer - Total & Button */}
                <div className="border-t border-border bg-muted/30 p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base lg:text-xl font-medium">Gesamt</span>
                    <motion.span
                      key={totalPrice}
                      initial={{ scale: 1.2, color: "hsl(var(--primary))" }}
                      animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                      className="text-2xl lg:text-4xl font-bold"
                    >
                      {totalPrice}€
                    </motion.span>
                  </div>
                  <Button
                    size="lg"
                    className="w-full h-12 lg:h-16 text-base lg:text-xl font-semibold gap-2"
                    onClick={handleBooking}
                  >
                    Jetzt buchen
                    <ArrowRight className="h-5 w-5 lg:h-6 lg:w-6" />
                  </Button>
                </div>

                {/* Ticket Tear Line */}
                <div className="relative h-4 bg-muted/20">
                  <div
                    className="absolute inset-x-0 top-0 h-px bg-border"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, transparent, transparent 8px, hsl(var(--border)) 8px, hsl(var(--border)) 16px)",
                    }}
                  />
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Antwort binnen 24h
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
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

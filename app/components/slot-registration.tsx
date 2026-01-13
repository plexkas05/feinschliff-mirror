"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Calendar,
  Mail,
  Sparkles,
  Info,
  Truck,
  CheckCircle2,
  Store,
  Clock
} from "lucide-react"

export function SlotRegistration() {
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [serviceType, setServiceType] = useState("grundschliff")
  const [deliveryOption, setDeliveryOption] = useState<"selbst" | "abholung">("selbst")

  // 1. Definition der Services
  const serviceDetails: Record<string, { label: string; price: number; type: 'single' | 'package' }> = {
    grundschliff: { label: "Grundschliff – Kleines Messer", price: 12, type: 'single' },
    meisterschliff: { label: "Meisterschliff – Großes Messer", price: 16, type: 'single' },
    kombi: { label: "Kombi-Schliff – 5 Messer Paket", price: 50, type: 'package' },
    feinschliff: { label: "Der Feinschliff – 15 Messer Paket", price: 120, type: 'package' },
  }

  // 2. Preisberechnung
  const currentService = serviceDetails[serviceType]
  const deliveryCost = deliveryOption === "abholung" ? 8 : 0
  const totalPrice = currentService.price + deliveryCost

  // 3. E-Mail Generierung
  const handleBooking = () => {
    const serviceName = currentService.label
    
    let deliveryText = ""
    let deliveryCostText = ""

    if (deliveryOption === "abholung") {
      deliveryText = "Abhol- & Lieferservice"
      deliveryCostText = "8,00 €"
    } else {
      deliveryText = "Selbstabgabe"
      deliveryCostText = "0,00 €"
    }

    const subject = `Anfrage: ${serviceName} für ${totalPrice}€`
    
    const body = `Hallo Felix,%0D%0A%0D%0AIch möchte gerne folgenden Service anfragen:
    %0D%0A%0D%0A--------------------------------%0D%0A🔪 WAHL: ${serviceName}%0D%0APreis: ${currentService.price} €%0D%0A%0D%0A🚚 ÜBERGABE: ${deliveryText}%0D%0AKosten: ${deliveryCostText}%0D%0A%0D%0A
    💰 GESAMTPREIS: ${totalPrice} €%0D%0A--------------------------------%0D%0A%0D%0AAbgabedatum: ${date}%0D%0AMeine E-Mail: ${email}%0D%0A%0D%0ABitte um kurze Bestätigung.`

    window.location.href = `mailto:felix.kastner27@gmail.com?subject=${subject}&body=${body}`
  }

  // 4. Die Logik für das Fertigstellungsdatum
  const completionInfo = useMemo(() => {
    if (!date) return null

    const startDate = new Date(date)
    let daysToAdd = 0
    let labelText = ""

    // LOGIK: Einzelmesser = 3 Tage, Pakete = 7 Tage
    if (currentService.type === 'single') {
      daysToAdd = 3
      labelText = "nach 72 Stunden"
    } else {
      daysToAdd = 7
      labelText = "spätestens 1 Woche später"
    }

    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + daysToAdd)
    
    const formattedDate = endDate.toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
    })

    return {
      dateString: formattedDate,
      label: labelText,
    }
  }, [date, serviceType, currentService.type]) 

  return (
    <section id="termin" className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 lg:py-40">
      <div className="w-full max-w-md lg:max-w-2xl space-y-8 lg:space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-2 lg:space-y-6">
          <div className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 lg:px-8 lg:py-3 text-sm lg:text-lg text-muted-foreground">
            <Clock className="mr-2 h-4 w-4 lg:h-6 lg:w-6 -translate-y-1/10 text-muted-foreground" />
            Schnelle Terminbuchung
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl">
            Termin buchen
          </h1>
          <p className="text-muted-foreground lg:text-2xl">
            Wähle einen freien Slot für deinen Schleifservice.
          </p>
        </div>

        {/* Booking Card */}
        <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-4 lg:p-10 lg:pb-8">
            <CardTitle className="text-xl lg:text-4xl">Dein Auftrag</CardTitle>
            <CardDescription className="lg:text-2xl">
              Fülle das Formular aus und wir melden uns bei dir.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 lg:space-y-10 lg:px-10 lg:pb-10">
            
            {/* Email Field */}
            <div className="space-y-2 lg:space-y-4">
              <Label htmlFor="email" className="text-sm lg:text-2xl font-medium">
                E-Mail Adresse
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 lg:left-5 top-1/2 h-4 w-4 lg:h-6 lg:w-6 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="deine@email.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 lg:pl-14 lg:h-16 lg:text-lg"
                />
              </div>
            </div>

            {/* Service Type Field */}
            <div className="space-y-2 lg:space-y-4">
              <Label htmlFor="service-type" className="text-sm lg:text-2xl font-medium">
                Was möchtest du schleifen lassen?
              </Label>
              <div className="relative">
                <Sparkles className="absolute left-3 lg:left-5 top-1/2 h-4 w-4 lg:h-6 lg:w-6 -translate-y-1/2 text-muted-foreground" />
                <select
                  id="service-type"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="flex h-10 lg:h-16 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 lg:pl-14 text-sm lg:text-lg ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  {Object.entries(serviceDetails).map(([key, details]) => (
                    <option key={key} value={key}>
                      {details.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="space-y-3 lg:space-y-5">
              <Label className="text-sm lg:text-2xl font-medium">
                Wie kommen die Messer zu mir?
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Option 1: Selbstabgabe */}
                <div
                  onClick={() => setDeliveryOption("selbst")}
                  className={`
                    relative flex cursor-pointer flex-col justify-between rounded-xl border-2 p-4 lg:p-6 transition-all hover:bg-muted/50
                    ${deliveryOption === "selbst" 
                      ? "border-primary bg-primary/5 shadow-sm" 
                      : "border-border bg-background"
                    }
                  `}
                >
                  <div className="flex justify-between items-start mb-2">
                    <Store className={`h-6 w-6 lg:h-8 lg:w-8 ${deliveryOption === "selbst" ? "text-primary" : "text-muted-foreground"}`} />
                    {deliveryOption === "selbst" && (
                      <CheckCircle2 className="h-5 w-5 text-primary animate-in fade-in zoom-in" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="font-semibold lg:text-xl block">Selbstabgabe</span>
                    <span className="text-sm lg:text-base text-muted-foreground block">
                      Du bringst sie vorbei
                    </span>
                  </div>
                  <span className="mt-3 inline-block rounded-md bg-secondary px-4 py-2 text-xs font-medium text-secondary-foreground w-fit">
                    Kostenlos
                  </span>
                </div>

                {/* Option 2: Abholservice */}
                <div
                  onClick={() => setDeliveryOption("abholung")}
                  className={`
                    relative flex cursor-pointer flex-col justify-between rounded-xl border-2 p-4 lg:p-6 transition-all hover:bg-muted/50
                    ${deliveryOption === "abholung" 
                      ? "border-primary bg-primary/5 shadow-sm" 
                      : "border-border bg-background"
                    }
                  `}
                >
                  <div className="flex justify-between items-start mb-2">
                    <Truck className={`h-6 w-6 lg:h-8 lg:w-8 ${deliveryOption === "abholung" ? "text-primary" : "text-muted-foreground"}`} />
                    {deliveryOption === "abholung" && (
                      <CheckCircle2 className="h-5 w-5 text-primary animate-in fade-in zoom-in" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="font-semibold lg:text-xl block">Hol & Bring Service</span>
                    <span className="text-sm lg:text-base text-muted-foreground block">
                      Bequem von zuhause
                    </span>
                  </div>
                  <span className="mt-3 inline-block rounded-md bg-primary/10 px-4 py-2 text-xs font-medium text-primary w-fit border border-primary/20">
                    + 8,00 €
                  </span>
                </div>

              </div>
            </div>

            {/* Date Field + Dynamic Info */}
            <div className="space-y-2 lg:space-y-4">
              {/* CHANGE START: Label passt sich jetzt an */}
              <Label htmlFor="date" className="text-sm lg:text-2xl font-medium">
                {deliveryOption === "selbst" 
                  ? "Abgabedatum (Wann bringst du sie?)" 
                  : "Abholtermin (Wann sollen wir sie holen?)"
                }
              </Label>
              {/* CHANGE END */}
              <div className="relative">
                <Calendar className="absolute left-3 lg:left-5 top-1/2 h-4 w-4 lg:h-6 lg:w-6 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10 lg:pl-14 lg:h-16 lg:text-lg cursor-pointer"
                />
              </div>
              
              {/* Dynamische Info-Anzeige (Wieder im schlichten Blau) */}
              {completionInfo && (
                <div className="mt-2 lg:mt-4 flex items-start gap-2 lg:gap-4 rounded-lg bg-blue-50/50 border border-blue-100 p-3 lg:p-5 text-sm lg:text-lg text-muted-foreground animate-in fade-in slide-in-from-top-2 duration-300">
                  <Info className="mt-0.5 h-4 w-4 lg:h-6 lg:w-6 shrink-0 text-blue-600" />
                  <span className="text-blue-900/80">
                    {deliveryOption === "selbst" ? "Fertig zur Abholung: " : "Lieferbereit: "}
                    <strong>spätestens am {completionInfo.dateString}</strong>.
                    <br />
                    <span className="text-xs lg:text-base opacity-80">({completionInfo.label})</span>
                  </span>
                </div>
              )}
            </div>

            {/* Submit Button mit Preis-Vorschau */}
            <Button 
              className="w-full lg:h-18 lg:text-xl font-semibold shadow-lg hover:shadow-xl transition-all" 
              size="lg" 
              onClick={handleBooking}
            >
              Anfrage senden  ({totalPrice} €)
            </Button>

            {/* Footer Links */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs lg:text-base uppercase">
                <span className="bg-card px-2 lg:px-4 text-muted-foreground">oder</span>
              </div>
            </div>

            <Button
              variant="ghost"
              className="w-full lg:h-18 lg:text-xl text-muted-foreground hover:text-foreground"
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowLeft className="mr-2 h-4 w-4 lg:h-6 lg:w-6" />
              Zurück zum Start
            </Button>

          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-12 text-sm lg:text-lg text-muted-foreground">
          <div className="flex items-center gap-1.5 lg:gap-3 bg-muted/50 px-3 py-1 rounded-full">
            <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-green-500 animate-pulse" />
            Antwort binnen 24h
          </div>
          <div className="flex items-center gap-1.5 lg:gap-3 bg-muted/50 px-3 py-1 rounded-full">
            <Sparkles className="h-3 w-3 lg:h-4 lg:w-4 text-primary" />
            Profischliff
          </div>
        </div>
      </div>
    </section>
  )
}
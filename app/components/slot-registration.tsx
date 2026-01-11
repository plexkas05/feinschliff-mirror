"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Mail, Clock, PenTool, Info } from "lucide-react"

export function SlotRegistration() {
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [serviceType, setServiceType] = useState("grundschliff")

  const completionInfo = useMemo(() => {
    if (!date) return null

    const startDate = new Date(date)

    // Tage basierend auf Pakettyp
    let daysToAdd = 3
    let label = "nach 72 Stunden"

    if (serviceType === "grundschliff" || serviceType === "meisterschliff") {
      daysToAdd = 3
      label = "nach 72 Stunden"
    } else if (serviceType === "kombi") {
      daysToAdd = 7
      label = "ca. 1 Woche"
    } else if (serviceType === "feinschliff") {
      daysToAdd = 10
      label = "ca. 10 Tage"
    }

    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + daysToAdd)

    const formattedDate = endDate.toLocaleDateString("de-DE", {
      day: "numeric",
      month: "long",
    })

    return {
      dateString: formattedDate,
      label: label,
    }
  }, [date, serviceType])

  return (
    <section id="termin" className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 lg:py-32">
      <div className="w-full max-w-md lg:max-w-lg space-y-8 lg:space-y-10">
        {/* Header */}
        <div className="text-center space-y-2 lg:space-y-4">
          <div className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 lg:px-6 lg:py-2 text-sm lg:text-base text-muted-foreground">
            <Clock className="mr-2 h-4 w-4 lg:h-5 lg:w-5 -translate-y-1/2" />
            Schnelle Terminbuchung
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Termin buchen</h1>
          <p className="text-muted-foreground lg:text-lg">Wähle einen freien Slot für deinen Schleifservice.</p>
        </div>

        {/* Booking Card */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-1 pb-4 lg:p-8 lg:pb-6">
            <CardTitle className="text-xl lg:text-2xl">Terminanfrage</CardTitle>
            <CardDescription className="lg:text-base">
              Fülle das Formular aus und wir melden uns bei dir.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 lg:space-y-8 lg:px-8 lg:pb-8">
            {/* Email Field */}
            <div className="space-y-2 lg:space-y-3">
              <Label htmlFor="email" className="text-sm lg:text-base font-medium">
                E-Mail Adresse
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 lg:left-4 top-1/2 h-4 w-4 lg:h-5 lg:w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="deine@email.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 lg:pl-12 lg:h-12 lg:text-base"
                />
              </div>
            </div>

            <div className="space-y-2 lg:space-y-3">
              <Label htmlFor="service-type" className="text-sm lg:text-base font-medium">
                Was möchtest du schleifen lassen?
              </Label>
              <div className="relative">
                <PenTool className="absolute left-3 lg:left-4 top-1/2 h-4 w-4 lg:h-5 lg:w-5 -translate-y-1/2 text-muted-foreground" />
                <select
                  id="service-type"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="flex h-10 lg:h-12 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 lg:pl-12 text-sm lg:text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                >
                  <option value="grundschliff">Grundschliff – Kleines Messer (12€)</option>
                  <option value="meisterschliff">Meisterschliff – Großes Messer (16€)</option>
                  <option value="kombi">Kombi-Schliff – 5 Messer Paket (50€)</option>
                  <option value="feinschliff">Der Feinschliff – 15 Messer Paket (120€)</option>
                </select>
              </div>
            </div>

            {/* Date Field */}
            <div className="space-y-2 lg:space-y-3">
              <Label htmlFor="date" className="text-sm lg:text-base font-medium">
                Abgabedatum
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 lg:left-4 top-1/2 h-4 w-4 lg:h-5 lg:w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10 lg:pl-12 lg:h-12 lg:text-base"
                />
              </div>

              {completionInfo && (
                <div className="mt-2 flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground animate-in fade-in slide-in-from-top-2 duration-300">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    Fertig zur Abholung: <strong>spätestens am {completionInfo.dateString}</strong> (
                    {completionInfo.label}).
                  </span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button className="w-full lg:h-14 lg:text-lg" size="lg">
              Terminanfrage senden
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs lg:text-sm uppercase">
                <span className="bg-card px-2 text-muted-foreground">oder</span>
              </div>
            </div>

            {/* Back Link */}
            <Button
              variant="outline"
              className="w-full bg-transparent lg:h-14 lg:text-lg"
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowLeft className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
              Zurück zum Anfang
            </Button>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-6 lg:gap-10 text-sm lg:text-base text-muted-foreground">
          <div className="flex items-center gap-1.5 lg:gap-2">
            <div className="h-2 w-2 lg:h-2.5 lg:w-2.5 rounded-full bg-green-500" />
            Schnelle Antwort
          </div>
          <div className="flex items-center gap-1.5 lg:gap-2">
            <div className="h-2 w-2 lg:h-2.5 lg:w-2.5 rounded-full bg-green-500" />
            Kostenlose Beratung
          </div>
        </div>
      </div>
    </section>
  )
}

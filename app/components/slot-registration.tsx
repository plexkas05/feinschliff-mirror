"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Mail, Compass, Sparkles, Info } from "lucide-react"

export function SlotRegistration() {
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")
  const [serviceType, setServiceType] = useState("grundschliff")

  const completionInfo = useMemo(() => {
    if (!date) return null

    const startDate = new Date(date)

    let daysToAdd = 3
    let label = "~72 Stunden"

    if (serviceType === "grundschliff" || serviceType === "meisterschliff") {
      daysToAdd = 3
      label = "~72 Stunden"
    } else if (serviceType === "kombi") {
      daysToAdd = 7
      label = "~1 Woche"
    } else if (serviceType === "feinschliff") {
      daysToAdd = 10
      label = "~10 Tage"
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
    <section id="termin" className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 lg:py-40">
      <div className="w-full max-w-md lg:max-w-2xl space-y-8 lg:space-y-12">
        {/* Header */}
        <div className="text-center space-y-2 lg:space-y-6">
          <div className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 lg:px-8 lg:py-3 text-sm lg:text-lg text-muted-foreground">
            <Compass className="mr-2 h-4 w-4 lg:h-6 lg:w-6" />
            Schnelle Terminbuchung
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl">Termin buchen</h1>
          <p className="text-muted-foreground lg:text-2xl">Wähle einen freien Slot für deinen Schleifservice.</p>
        </div>

        {/* Booking Card */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-1 pb-4 lg:p-10 lg:pb-8">
            <CardTitle className="text-xl lg:text-4xl">Terminanfrage</CardTitle>
            <CardDescription className="lg:text-2xl">Fülle das Formular aus und wir melden uns bei dir.</CardDescription>
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
                  className="flex h-10 lg:h-16 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 lg:pl-14 text-sm lg:text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                >
                  <option value="grundschliff">Grundschliff – Kleines Messer (12€)</option>
                  <option value="meisterschliff">Meisterschliff – Großes Messer (16€)</option>
                  <option value="kombi">Kombi-Schliff – 5 Messer Paket (50€)</option>
                  <option value="feinschliff">Der Feinschliff – 15 Messer Paket (120€)</option>
                </select>
              </div>
            </div>

            {/* Date Field */}
            <div className="space-y-2 lg:space-y-4">
              <Label htmlFor="date" className="text-sm lg:text-2xl font-medium">
                Abgabedatum
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 lg:left-5 top-1/2 h-4 w-4 lg:h-6 lg:w-6 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="pl-10 lg:pl-14 lg:h-16 lg:text-lg"
                />
              </div>

              {completionInfo && (
                <div className="mt-2 lg:mt-4 flex items-start gap-2 lg:gap-4 rounded-lg bg-muted/50 p-3 lg:p-5 text-sm lg:text-lg text-muted-foreground animate-in fade-in slide-in-from-top-2 duration-300">
                  <Info className="mt-0.5 h-4 w-4 lg:h-6 lg:w-6 shrink-0 text-primary" />
                  <span>
                    Fertig zur Abholung: <strong>spätestens am {completionInfo.dateString}</strong> (
                    {completionInfo.label})
                  </span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button className="w-full lg:h-18 lg:text-xl" size="lg">
              Terminanfrage senden
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs lg:text-base uppercase">
                <span className="bg-card px-2 lg:px-4 text-muted-foreground">oder</span>
              </div>
            </div>

            {/* Back Link */}
            <Button
              variant="outline"
              className="w-full bg-transparent lg:h-18 lg:text-xl"
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ArrowLeft className="mr-2 h-4 w-4 lg:h-6 lg:w-6" />
              Zurück zum Anfang
            </Button>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-6 lg:gap-12 text-sm lg:text-lg text-muted-foreground">
          <div className="flex items-center gap-1.5 lg:gap-3">
            <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-green-500" />
            Schnelle Antwort
          </div>
          <div className="flex items-center gap-1.5 lg:gap-3">
            <div className="h-2 w-2 lg:h-3 lg:w-3 rounded-full bg-green-500" />
            Kostenlose Beratung
          </div>
        </div>
      </div>
    </section>
  )
}

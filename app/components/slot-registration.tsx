"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Mail, Clock } from "lucide-react"

export function SlotRegistration() {
  const [email, setEmail] = useState("")
  const [date, setDate] = useState("")

  return (
    <section id="termin" className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            Schnelle Terminbuchung
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Termin buchen</h1>
          <p className="text-muted-foreground">Wähle einen freien Slot für deinen Schleifservice.</p>
        </div>

        {/* Booking Card */}
        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl">Terminanfrage</CardTitle>
            <CardDescription>Fülle das Formular aus und wir melden uns bei dir.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                E-Mail Adresse
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="deine@email.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Date Field */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">
                Wunschdatum
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="pl-10" />
              </div>
            </div>

            {/* Submit Button */}
            <Button className="w-full" size="lg">
              Terminanfrage senden
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">oder</span>
              </div>
            </div>

            {/* Back Link */}
            <Button 
              variant="outline" 
              className="w-full bg-transparent" 
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zum Anfang
            </Button>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            Schnelle Antwort
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            Kostenlose Beratung
          </div>
        </div>
      </div>
    </section>
  )
}

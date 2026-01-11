"use client"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function PricingSection() {
  const plans = [
    {
      name: "Kleines Messer",
      price: "12€",
      description: "Ideal für Küchenmesser bis 15cm",
      features: ["Professioneller Schliff", "Schneidtest inklusive", "Bearbeitungszeit: 3-4 Tage"],
      popular: false,
    },
    {
      name: "Großes Messer",
      price: "16€",
      description: "Für Kochmesser und Santoku ab 15cm",
      features: ["Professioneller Schliff", "Schneidtest inklusive", "Bearbeitungszeit: 3-4 Tage", "Politur der Klinge"],
      popular: true, // Das ist die mittlere Karte
    },
    {
      name: "Profi-Paket",
      price: "50€",
      description: "5 Messer Ihrer Wahl",
      features: ["Alle Messergrößen",
      "Schneidtest inklusive",
      "Bearbeitungszeit: 5-7 Tage",
      "Politur aller Klingen",
      "10% Ersparnis",
      ],
      popular: false,
    },
  ]

  return (
    <section id="preise" className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Unsere Preise</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Transparent und fair. Wähle das Paket, das zu deinen Messern passt.
            </p>
          </div>
        </div>
        
        {/* Grid Container: Macht alle Karten gleich hoch */}
        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              // HIER IST DER TRICK: 
              // 'flex flex-col' macht die Karte zur Flexbox
              // 'h-full' zwingt sie auf die volle Höhe der Nachbarn
              className={`flex flex-col h-full ${
                plan.popular ? "border-primary shadow-lg scale-105 relative z-10" : "border-border"
              }`}
            >
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-bold">{plan.price}</div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              
              {/* HIER IST DER ZWEITE TRICK:
                  'flex-1' füllt den leeren Raum, damit der Footer nach unten rutscht */}
              <CardContent className="flex-1">
                <ul className="grid gap-3 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                {/* Button scrollt jetzt auch zur Buchung */}
                <Button 
                  className="w-full" 
                  variant="outline" // Macht alle Buttons weiß/outline
                  onClick={() => {
                    const element = document.getElementById('termin')
                    if (element) element.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Jetzt buchen
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
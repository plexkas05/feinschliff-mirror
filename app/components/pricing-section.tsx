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
      features: [
        "Professioneller Schliff",
        "Schneidtest inklusive",
        "Bearbeitungszeit: 3-4 Tage",
        "Politur der Klinge",
      ],
      popular: true, // Das ist die mittlere Karte
    },
    {
      name: "Profi-Paket",
      price: "50€",
      description: "5 Messer Ihrer Wahl",
      features: [
        "Alle Messergrößen",
        "Schneidtest inklusive",
        "Bearbeitungszeit: 5-7 Tage",
        "Politur aller Klingen",
        "10% Ersparnis",
      ],
      popular: false,
    },
  ]

  return (
    <section id="preise" className="w-full py-12 md:py-24 lg:py-40 bg-slate-50">
      <div className="container px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 lg:space-y-6 text-center">
          <div className="space-y-2 lg:space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">Unsere Preise</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed">
              Transparent und fair. Wähle das Paket, das zu deinen Messern passt.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-12 lg:mt-16 md:grid-cols-3 lg:gap-10">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col h-full ${
                plan.popular ? "border-primary shadow-lg scale-105 relative z-10" : "border-border"
              }`}
            >
              <CardHeader className="lg:p-8">
                <CardTitle className="text-xl lg:text-2xl">{plan.name}</CardTitle>
                <div className="text-3xl lg:text-4xl font-bold">{plan.price}</div>
                <CardDescription className="lg:text-base">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 lg:px-8">
                <ul className="grid gap-3 lg:gap-4 text-sm lg:text-base">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 lg:gap-3">
                      <Check className="h-4 w-4 lg:h-5 lg:w-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="lg:p-8">
                <Button
                  className="w-full lg:h-12 lg:text-base bg-transparent"
                  variant="outline"
                  onClick={() => {
                    const element = document.getElementById("termin")
                    if (element) element.scrollIntoView({ behavior: "smooth" })
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

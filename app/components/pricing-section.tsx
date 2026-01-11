"use client"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function PricingSection() {
  const plans = [
    {
      name: "Grundschliff",
      subtitle: "Kleines Messer",
      price: "12€",
      description: "Ideal für Küchenmesser bis 15cm",
      features: ["Professioneller Schliff", "Schneidtest inklusive", "Bearbeitungszeit: 3-4 Tage"],
    },
    {
      name: "Meisterschliff",
      subtitle: "Großes Messer",
      price: "16€",
      description: "Für Kochmesser und Santoku ab 15cm",
      features: [
        "Professioneller Schliff",
        "Schneidtest inklusive",
        "Bearbeitungszeit: 3-4 Tage",
        "Politur der Klinge",
      ],
    },
    {
      name: "Kombi-Schliff",
      subtitle: "5 Messer Paket",
      price: "50€",
      description: "5 Messer Ihrer Wahl",
      features: [
        "Alle Messergrößen",
        "Schneidtest inklusive",
        "Bearbeitungszeit: 5-7 Tage",
        "Politur aller Klingen",
        "10% Ersparnis",
      ],
    },
    {
      name: "Der Feinschliff",
      subtitle: "15 Messer Paket",
      price: "120€",
      description: "15 Messer deiner Wahl",
      features: [
        "Alle Messergrößen",
        "Schneidtest inklusive",
        "Bearbeitungszeit: 7-10 Tage",
        "Politur aller Klingen",
        "20% Ersparnis",
        "Prioritäts-Service",
      ],
    },
  ]

  return (
    <section id="preise" className="w-full py-12 md:py-24 lg:py-48 bg-slate-50">
      <div className="container px-4 md:px-6 lg:px-8 mx-auto max-w-7xl lg:max-w-[90rem]">
        <div className="flex flex-col items-center justify-center space-y-4 lg:space-y-8 text-center">
          <div className="space-y-2 lg:space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl lg:text-7xl">Unsere Preise</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed">
              Transparent und fair. Wähle das Paket, das zu deinen Messern passt.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-12 lg:mt-20 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className="flex flex-col h-full border-border transition-all duration-300 hover:border-primary hover:shadow-lg hover:scale-[1.02]"
            >
              <CardHeader className="lg:p-8">
                <CardTitle className="text-xl lg:text-3xl">{plan.name}</CardTitle>
                <p className="text-sm lg:text-base text-muted-foreground">{plan.subtitle}</p>
                <div className="text-3xl lg:text-5xl font-bold mt-2 lg:mt-4">{plan.price}</div>
                <CardDescription className="lg:text-lg">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 lg:px-8">
                <ul className="grid gap-3 lg:gap-5 text-sm lg:text-lg">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 lg:gap-4">
                      <Check className="h-4 w-4 lg:h-6 lg:w-6 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="lg:p-8">
                <Button
                  className="w-full lg:h-14 lg:text-lg bg-transparent"
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

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const pricingPlans = [
  {
    name: "Kleines Messer",
    description: "Ideal für Küchenmesser bis 15cm",
    price: "8",
    features: ["Professioneller Schliff", "Schneidtest inklusive", "Bearbeitungszeit: 3-4 Tage"],
    popular: false,
  },
  {
    name: "Großes Messer",
    description: "Für Kochmesser und Santoku ab 15cm",
    price: "12",
    features: ["Professioneller Schliff", "Schneidtest inklusive", "Bearbeitungszeit: 3-4 Tage", "Politur der Klinge"],
    popular: true,
  },
  {
    name: "Paket",
    description: "5 Messer Ihrer Wahl",
    price: "45",
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

export function PricingSection() {
  return (
    <section id="preise" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-balance">Unsere Preise</h2>
          <p className="mt-3 text-muted-foreground text-pretty max-w-xl mx-auto">
            Transparente Preise für professionellen Messerschliff. Keine versteckten Kosten.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className={plan.popular ? "border-primary shadow-lg relative" : ""}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Beliebt
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}€</span>
                  {plan.name === "Paket" ? (
                    <span className="text-muted-foreground ml-1">/ Paket</span>
                  ) : (
                    <span className="text-muted-foreground ml-1">/ Messer</span>
                  )}
                </div>
                <ul className="space-y-3 text-left">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
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

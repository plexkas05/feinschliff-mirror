import { CalendarCheck, Package, Sparkles, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: CalendarCheck,
    title: "Termin buchen",
    description: "Wähle einen passenden Slot online – schnell und unkompliziert.",
  },
  {
    icon: Package,
    title: "Messer übergeben",
    description: "Bring sie vorbei oder nutze unseren bequemen Abholservice.",
  },
  {
    icon: Sparkles,
    title: "Scharf zurück",
    description: "Nach 72 Stunden sind deine Messer wieder einsatzbereit.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-t border-border bg-muted/30 px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-5xl lg:max-w-6xl">
        {/* Header */}
        <div className="mb-16 lg:mb-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">Wie es funktioniert</h2>
          <p className="mx-auto mt-4 lg:mt-6 max-w-xl lg:max-w-2xl text-muted-foreground lg:text-lg">
            In drei einfachen Schritten zu rasiermesserscharfen Klingen.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              {/* Arrow between steps (desktop only) */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-12 lg:top-14 hidden translate-x-1/2 text-muted-foreground/40 md:block">
                  <ArrowRight className="h-6 w-6 lg:h-8 lg:w-8" />
                </div>
              )}

              {/* Step number badge */}
              <div className="mb-4 lg:mb-6 flex h-5 w-5 lg:h-7 lg:w-7 items-center justify-center rounded-full bg-primary text-xs lg:text-sm font-medium text-primary-foreground">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="mb-4 lg:mb-6 flex h-16 w-16 lg:h-20 lg:w-20 items-center justify-center rounded-2xl lg:rounded-3xl border border-border bg-background shadow-sm">
                <step.icon className="h-8 w-8 lg:h-10 lg:w-10 text-primary" />
              </div>

              {/* Content */}
              <h3 className="mb-2 lg:mb-3 text-lg lg:text-xl font-semibold">{step.title}</h3>
              <p className="max-w-xs lg:max-w-sm text-sm lg:text-base text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

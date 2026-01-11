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
    description: "Nach 72 Stunden sind deine Messer wieder zur abholung bereit, oder werden dir zugeschickt.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-t border-border bg-muted/30 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Wie es funktioniert</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            In drei einfachen Schritten zu rasiermesserscharfen Klingen.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-3 md:gap-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              {/* Arrow between steps (desktop only) */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-10 hidden translate-x-1/2 text-muted-foreground/40 md:block">
                  <ArrowRight className="h-6 w-6" />
                </div>
              )}

              {/* Step number badge */}
              <div className="mb-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background shadow-sm">
                <step.icon className="h-8 w-8 text-primary" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
              <p className="max-w-xs text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

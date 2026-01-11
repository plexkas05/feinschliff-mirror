"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 lg:py-40 text-center">
      <div className="max-w-3xl lg:max-w-5xl space-y-8 lg:space-y-12">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 lg:px-8 lg:py-3 text-sm lg:text-lg text-muted-foreground">
          Professioneller Messerschleifservice
        </div>

        {/* Headline */}
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-8xl">
          Willkommen bei <span className="text-primary">FEINSCHLIFF</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto max-w-xl lg:max-w-3xl text-pretty text-lg text-muted-foreground sm:text-xl lg:text-2xl">
          Wir bringen Ihre Messer wieder auf Höchstleistung. Präzise, zuverlässig und mit Leidenschaft für Qualität.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4 lg:gap-8 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            size="lg"
            className="min-w-[180px] lg:min-w-[260px] lg:h-16 lg:text-xl lg:px-10 bg-transparent"
            onClick={() => scrollToSection("preise")}
          >
            Unsere Preise
          </Button>

          <Button
            size="lg"
            className="min-w-[180px] lg:min-w-[260px] lg:h-16 lg:text-xl lg:px-10"
            onClick={() => scrollToSection("termin")}
          >
            Termin buchen
          </Button>
        </div>
      </div>
    </section>
  )
}

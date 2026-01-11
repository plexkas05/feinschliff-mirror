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
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 lg:py-32 text-center">
      <div className="max-w-3xl lg:max-w-4xl space-y-8 lg:space-y-10">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 lg:px-6 lg:py-2 text-sm lg:text-base text-muted-foreground">
          Professioneller Messerschleifservice
        </div>

        {/* Headline */}
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Willkommen bei <span className="text-primary">FEINSCHLIFF</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto max-w-xl lg:max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl lg:text-2xl">
          Wir bringen Ihre Messer wieder auf Höchstleistung. Präzise, zuverlässig und mit Leidenschaft für Qualität.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4 lg:gap-6 sm:flex-row sm:justify-center">
          <Button
            size="lg"
            className="min-w-[180px] lg:min-w-[220px] lg:h-14 lg:text-lg lg:px-8"
            onClick={() => scrollToSection("termin")}
          >
            Termin buchen
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="min-w-[180px] lg:min-w-[220px] lg:h-14 lg:text-lg lg:px-8 bg-transparent"
            onClick={() => scrollToSection("preise")}
          >
            Unsere Preise
          </Button>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  
  // Hilfsfunktion für das weiche Scrollen
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-3xl space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
          Professioneller Messerschleifservice
        </div>

        {/* Headline */}
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Willkommen bei <span className="text-primary">FEINSCHLIFF</span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl">
          Wir bringen Ihre Messer wieder auf Höchstleistung. Präzise, zuverlässig und mit Leidenschaft für Qualität.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button 
            size="lg" 
            className="min-w-[180px]"
            onClick={() => scrollToSection("termin")}
          >
            Termin buchen
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="min-w-[180px] bg-transparent"
            onClick={() => scrollToSection("preise")}
          >
            Unsere Preise
          </Button>
        </div>
      </div>
    </section>
  )
}
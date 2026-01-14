"use client"

import { useRef, useState, useEffect } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"

const plans = [
  {
    name: "Grundschliff",
    price: "12€",
    description: "Kleines Messer",
    features: ["Klingen bis 12cm", "Professioneller Schliff", "Schneidtest inklusive", "Bearbeitungszeit: 3-4 Tage"],
  },
  {
    name: "Meisterschliff",
    price: "16€",
    description: "Großes Messer",
    features: [
      "Alle Messergrößen",
      "Professioneller Schliff",
      "Schneidtest inklusive",
      "Bearbeitungszeit: 3-4 Tage",
      "Politur der Klinge",
    ],
  },
  {
    name: "Kombi-Schliff",
    price: "50€",
    description: "5 Messer",
    features: [
      "Alle Messergrößen",
      "Schneidtest inklusive",
      "Bearbeitungszeit: 5-7 Tage",
      "Politur aller Klingen",
      "Günstiger als Einzelpreise",
    ],
  },
  {
    name: "Der Feinschliff",
    price: "120€",
    description: "15 Messer",
    features: [
      "Alle Messergrößen",
      "Schneidtest inklusive",
      "Bearbeitungszeit: 7-10 Tage",
      "Politur aller Klingen",
      "Bestes Preis-Leistungs-Verhältnis",
      "Prioritäts-Service",
    ],
  },
]

export function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="preise"
      // SCALING: Nochmals kompakter: py-12/24 statt py-12/32
      className="relative w-full py-12 lg:py-24 min-h-[70vh] flex flex-col justify-center bg-slate-950 overflow-hidden"
    >
      <div className="container relative px-4 md:px-6 lg:px-8 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          // SCALING: Abstand reduziert mb-12/20
          className="flex flex-col items-center justify-center space-y-4 lg:space-y-5 text-center mb-12 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm lg:text-sm font-medium text-slate-300">
            Transparente Preise
          </span>
          
          {/* SCALING: Match mit HowItWorks (4xl / 5xl / 6xl) */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent drop-shadow-2xl">
            Unsere Pakete
          </h2>
          
          <p className="mx-auto max-w-2xl lg:max-w-3xl text-slate-400 text-lg lg:text-xl font-light leading-relaxed">
            Keine versteckten Kosten. Handwerkskunst zum Festpreis.
          </p>
        </motion.div>

        {/* Pricing Grid with Spotlight Effect */}
        <div ref={containerRef} className="relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 items-start">
          {/* Spotlight gradient that follows mouse */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 lg:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.08), transparent 0%)`,
            }}
          />

          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative h-full"
            >
              {/* Card Architecture */}
              <div 
                // SCALING: Padding p-4/5 (statt p-5/6) -> Macht die Karte physisch kleiner
                className="relative h-full flex flex-col rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 lg:p-5 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07] hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="mb-5 lg:mb-6 text-center lg:text-left">
                  {/* SCALING: text-lg/xl (statt xl/2xl) */}
                  <h3 className="text-lg lg:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 mb-1">
                    {plan.name}
                  </h3>
                  {/* SCALING: text-xs/sm */}
                  <p className="text-xs lg:text-sm text-slate-400 mb-3 font-medium">{plan.description}</p>
                  
                  {/* Price Tag */}
                  <div className="flex items-baseline justify-center lg:justify-start gap-1">
                    {/* SCALING: text-4xl/5xl (statt 5xl/6xl) -> Deutlich kompakter */}
                    <span className="text-4xl lg:text-5xl font-extrabold text-white tracking-tighter drop-shadow-sm">
                      {plan.price}
                    </span>
                  </div>
                </div>

                {/* Features */}
                {/* SCALING: space-y-2/3 (enger zusammen) */}
                <ul className="flex-1 space-y-2 lg:space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <div className="mt-0.5 rounded-full p-0.5 bg-white/10">
                        <Check className="h-3 w-3 text-slate-300" />
                      </div>
                      {/* SCALING: text-xs/sm (kleinere Schrift) */}
                      <span className="text-xs lg:text-sm text-slate-300 font-medium leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Button
                  variant="outline"
                  // SCALING: h-10/12 (statt 12/14) und text-xs/sm
                  className="w-full h-10 lg:h-12 text-xs lg:text-sm font-bold tracking-wide transition-all duration-300 border-white/10 bg-transparent text-white hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-50"
                  onClick={() => {
                    const element = document.getElementById("termin")
                    if (element) element.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Jetzt buchen
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 pointer-events-none" />
    </section>
  )
}
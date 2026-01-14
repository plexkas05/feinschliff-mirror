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
      className="relative w-full py-16 md:py-24 lg:py-40 min-h-[85vh] flex flex-col justify-center bg-slate-950 overflow-hidden"
    >
      <div className="container relative px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-4 lg:space-y-6 text-center mb-16 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm lg:text-base text-slate-300">
            Transparente Preise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-transparent">
            Unsere Pakete
          </h2>
          <p className="max-w-[600px] text-slate-400 text-base lg:text-lg">
            Fair und transparent. Wähle das Paket, das zu deinen Messern passt.
          </p>
        </motion.div>

        {/* Pricing Grid with Spotlight Effect */}
        <div ref={containerRef} className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Spotlight gradient that follows mouse */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 lg:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
            }}
          />

          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full flex flex-col rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md p-6 lg:p-8 transition-all duration-300 hover:border-white/20 hover:-translate-y-1">
                {/* Card Header */}
                <div className="mb-6 lg:mb-8">
                  <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm lg:text-base text-slate-400 mb-4">{plan.description}</p>
                  <div className="text-4xl lg:text-5xl font-bold text-white tracking-tight">{plan.price}</div>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3 lg:space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm lg:text-base text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Button
                  variant="outline"
                  className="w-full h-12 lg:h-14 text-sm lg:text-base border-white/10 bg-transparent text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300"
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

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
      // SCALING: py-16/40 -> py-12/32, min-h-[85vh] -> min-h-[75vh]
      className="relative w-full py-12 md:py-20 lg:py-32 min-h-[75vh] flex flex-col justify-center bg-slate-950 overflow-hidden"
    >
      <div className="container relative px-4 md:px-6 lg:px-8 mx-auto max-w-6xl"> {/* max-w-7xl -> max-w-6xl */}
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          // SCALING: mb-20/28 -> mb-16/24
          className="flex flex-col items-center justify-center space-y-5 lg:space-y-6 text-center mb-16 lg:mb-24"
        >
          {/* SCALING: text-sm/base -> text-xs/sm, px-4/2 -> px-3/1.5 */}
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-xs lg:text-sm font-medium text-slate-300">
            Transparente Preise
          </span>
          {/* SCALING: text-5xl/7xl -> text-4xl/6xl */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent drop-shadow-2xl">
            Unsere Pakete
          </h2>
          {/* SCALING: text-lg/xl -> text-base/lg */}
          <p className="max-w-[700px] text-slate-400 text-base lg:text-lg leading-relaxed">
            Keine versteckten Kosten. Handwerkskunst zum Festpreis.
          </p>
        </motion.div>

        {/* Pricing Grid with Spotlight Effect */}
        {/* SCALING: lg:gap-8 -> lg:gap-6 */}
        <div ref={containerRef} className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 items-start">
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
              {/* Card Architecture (Uniform Glass Slab) */}
              <div 
                // SCALING: p-6/8 -> p-5/6
                className="relative h-full flex flex-col rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 lg:p-6 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07] hover:-translate-y-1"
              >
                {/* Card Header */}
                {/* SCALING: mb-8/10 -> mb-6/8 */}
                <div className="mb-6 lg:mb-8 text-center lg:text-left">
                  {/* SCALING: text-2xl/3xl -> text-xl/2xl */}
                  <h3 className="text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-slate-400 mb-1">
                    {plan.name}
                  </h3>
                  {/* SCALING: text-base -> text-sm, mb-6 -> mb-4 */}
                  <p className="text-sm text-slate-400 mb-4 font-medium">{plan.description}</p>
                  
                  {/* Huge Price Tag */}
                  <div className="flex items-baseline justify-center lg:justify-start gap-1">
                    {/* SCALING: text-6xl/7xl -> text-5xl/6xl */}
                    <span className="text-5xl lg:text-6xl font-extrabold text-white tracking-tighter drop-shadow-sm">
                      {plan.price}
                    </span>
                  </div>
                </div>

                {/* Features (Bold & Readable) */}
                {/* SCALING: space-y-4/5 -> space-y-3/4, mb-10 -> mb-8 */}
                <ul className="flex-1 space-y-3 lg:space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-1 rounded-full p-0.5 bg-white/10">
                        <Check className="h-3.5 w-3.5 text-slate-300" />
                      </div>
                      {/* SCALING: text-base/lg -> text-sm/base */}
                      <span className="text-sm lg:text-base text-slate-300 font-medium leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button (Uniform) */}
                <Button
                  variant="outline"
                  // SCALING: h-14/16 -> h-12/14, text-base/lg -> text-sm/base
                  className="w-full h-12 lg:h-14 text-sm lg:text-base font-bold tracking-wide transition-all duration-300 border-white/10 bg-transparent text-white hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-50"
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

      {/* FIX: Gradient ends in strict slate-950, not system background */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 pointer-events-none" />
    </section>
  )
}
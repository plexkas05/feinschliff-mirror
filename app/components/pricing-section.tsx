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
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section
      ref={sectionRef}
      id="preise"
      className="relative w-full py-12 lg:py-24 min-h-[70vh] flex flex-col justify-center bg-white overflow-hidden"
    >
      <div className="container relative px-4 md:px-6 lg:px-8 mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center space-y-4 lg:space-y-5 text-center mb-12 lg:mb-20"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-slate-200 bg-white text-sm lg:text-sm font-medium text-slate-600 shadow-sm">
            Transparente Preise
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
            Unsere Pakete
          </h2>

          <p className="mx-auto max-w-2xl lg:max-w-3xl text-slate-500 text-lg lg:text-xl font-light leading-relaxed">
            Keine versteckten Kosten. Handwerkskunst zum Festpreis.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-5 items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative h-full"
            >
              {/* Card */}
              <div
                className="relative h-full flex flex-col rounded-2xl border border-slate-200 bg-white p-4 lg:p-5 transition-all duration-500 hover:border-slate-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="mb-5 lg:mb-6 text-center lg:text-left">
                  <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs lg:text-sm text-slate-500 mb-3 font-medium">{plan.description}</p>

                  {/* Price Tag */}
                  <div className="flex items-baseline justify-center lg:justify-start gap-1">
                    <span className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tighter">
                      {plan.price}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-2 lg:space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <div className="mt-0.5 rounded-full p-0.5 bg-emerald-100">
                        <Check className="h-3 w-3 text-emerald-600" />
                      </div>
                      <span className="text-xs lg:text-sm text-slate-600 font-medium leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <Button
                  variant="outline"
                  className="w-full h-10 lg:h-12 text-xs lg:text-sm font-bold tracking-wide transition-all duration-300 border-slate-200 bg-transparent text-slate-900 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
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
    </section>
  )
}

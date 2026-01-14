"use client"

import { useState, useRef } from "react"
import { Check, Info, Sparkles } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"

const prices = [
  {
    name: "Grundschliff",
    price: "12€",
    description: "Perfekt für kleine Gemüsemesser.",
    features: ["Vorschliff (Wasserkühlung)", "Feinschliff", "Lederabzug", "Schärfeprüfung"],
    popular: false,
  },
  {
    name: "Meisterschliff",
    price: "16€",
    description: "Für deine großen Kochmesser.",
    features: ["Vorschliff (Wasserkühlung)", "Meister-Feinschliff (4000er)", "Spiegelpolitur", "Lederabzug & Pflegeöl", "Rasur-Schärfe Test"],
    popular: true,
  },
  {
    name: "Kombi-Paket",
    price: "50€",
    description: "Das Rundum-Sorglos Paket.",
    features: ["Bis zu 5 Messer inklusive", "Mischung aus groß & klein", "Alle Meisterschliff-Vorteile", "Kostenlose Abholung (Graz)", "48h Express Service"],
    popular: false,
  },
]

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scrollToBooking = () => {
    document.getElementById("termin")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    // PADDING UPDATE: py-16 statt py-24
    <section id="preise" className="py-16 md:py-24 relative overflow-hidden bg-slate-950">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Header Compact */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Einfache Preise.</h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">
            Keine versteckten Kosten. Du zahlst nur für das Ergebnis.
          </p>
        </div>

        {/* Grid Compact: gap-6 statt gap-8 */}
        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {prices.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              // PADDING UPDATE: p-6 statt p-8
              className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                item.popular 
                  ? "bg-slate-900/80 border-indigo-500/50 shadow-2xl shadow-indigo-500/10" 
                  : "bg-slate-900/40 border-white/10 hover:bg-slate-900/60"
              }`}
            >
              {item.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                  <Sparkles size={12} /> Beliebt
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-200">{item.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  {/* FONT SIZE UPDATE: text-3xl statt text-4xl */}
                  <span className="text-3xl font-bold text-white">{item.price}</span>
                  {item.name === "Kombi-Paket" && <span className="text-sm text-slate-500">/ pauschal</span>}
                </div>
                <p className="text-sm text-slate-400 mt-2 min-h-[40px]">{item.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {item.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 shrink-0 mt-0.5 ${item.popular ? "text-indigo-400" : "text-slate-500"}`} />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={scrollToBooking}
                className={`w-full h-10 text-sm font-semibold rounded-xl ${
                  item.popular 
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white" 
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                Wählen
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
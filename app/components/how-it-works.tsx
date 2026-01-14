"use client"

import { motion } from "framer-motion"
import { CalendarClock, Truck, Sparkles, Smile } from "lucide-react"

const steps = [
  {
    icon: <CalendarClock className="w-6 h-6 text-white" />,
    title: "1. Termin buchen",
    desc: "Wähle online dein Paket und den Wunschtermin. Dauert keine 60 Sekunden.",
  },
  {
    icon: <Truck className="w-6 h-6 text-white" />,
    title: "2. Abgabe / Abholung",
    desc: "Bring die Messer vorbei (Seiersberg) oder nutze unseren bequemen Hol-Service.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-white" />,
    title: "3. Der Schliff",
    desc: "Wir schleifen nass auf Tormek-Maschinen. Schonend, präzise und eiskalt.",
  },
  {
    icon: <Smile className="w-6 h-6 text-white" />,
    title: "4. Freude am Kochen",
    desc: "Du erhältst deine Messer rasiermesserscharf zurück. Vorsicht beim Zwiebelschneiden!",
  },
]

export function HowItWorks() {
  return (
    // PADDING UPDATE: py-16 statt py-24
    <section id="ablauf" className="py-16 bg-slate-950 border-t border-white/5">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">So funktioniert's</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-6 relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-6 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 -z-10" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Circle Compact */}
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mb-4 relative z-10 group-hover:border-white/30 group-hover:bg-slate-800 transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                {step.icon}
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed px-2">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
"use client"

import { CalendarCheck, Package, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const steps = [
  {
    icon: CalendarCheck,
    title: "Termin buchen",
    description: "Wähle deinen Slot online in unter 60 Sekunden.",
  },
  {
    icon: Package,
    title: "Übergabe",
    description: "Bring die Messer vorbei oder nutze unseren Abholservice.",
  },
  {
    icon: Sparkles,
    title: "Feinschliff & Rückgabe",
    description: "Nach 72h erhältst du rasiermesserscharfe Klingen zurück.",
  },
]

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    // SCALING: py-24/40 -> py-20/32
    <section id="ablauf" className="relative overflow-hidden bg-slate-950 px-6 py-20 lg:py-32">
      <div className="relative z-10 mx-auto max-w-5xl lg:max-w-6xl"> {/* max-w-7xl -> max-w-6xl */}
        
        {/* Header SCALING: mb-20/32 -> mb-16/24 */}
        <motion.div 
          className="mb-16 lg:mb-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* SCALING: px-4/2 -> px-3/1.5, lg:text-base -> lg:text-sm */}
          <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm lg:text-sm font-medium text-slate-300">
            Einfacher Ablauf
          </span>

          {/* SCALING: text-5xl/7xl -> text-4xl/6xl */}
          <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl mb-5">
            <span className="bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent drop-shadow-xl">
              Wie es funktioniert
            </span>
          </h2>
          
          {/* SCALING: lg:text-2xl -> lg:text-xl */}
          <p className="mx-auto max-w-2xl lg:max-w-3xl text-slate-400 text-lg lg:text-xl font-light leading-relaxed">
            In drei einfachen Schritten zu rasiermesserscharfen Klingen.
          </p>
        </motion.div>

        {/* Steps Grid with connecting line */}
        <div className="relative">
          {/* Animated connecting line (desktop only) */}
          {/* SCALING: top-20/28 -> top-16/24 (aligned with new icon size) */}
          <div className="absolute top-16 lg:top-24 left-[16.67%] right-[16.67%] hidden md:block">
            <div className="h-[2px] w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-slate-400 to-transparent"
                animate={{
                  x: ["-100%", "400%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  repeatDelay: 1,
                }}
              />
            </div>
          </div>

          <motion.div
            className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10" // gap-12 -> gap-10
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step, index) => (
              <motion.div key={step.title} variants={cardVariants} className="group relative">
                {/* Glassmorphic Card */}
                {/* SCALING: p-8/12 -> p-6/10 */}
                <div className="relative flex flex-col items-center rounded-2xl lg:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 lg:p-10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.07]">
                  
                  {/* Step number badge */}
                  {/* SCALING: h-6/8 -> h-5/7 */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-6 w-6 lg:h-7 lg:w-7 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300">
                    {index + 1}
                  </div>

                  {/* Icon with glow on hover */}
                  {/* SCALING: h-16/24 -> h-14/20 */}
                  <div className="mb-6 lg:mb-8 flex h-14 w-14 lg:h-20 lg:w-20 items-center justify-center rounded-2xl lg:rounded-3xl border border-white/10 bg-slate-900/80 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(148,163,184,0.3)] group-hover:border-slate-500/50">
                    {/* SCALING: h-8/12 -> h-7/10 */}
                    <step.icon className="h-7 w-7 lg:h-10 lg:w-10 text-slate-300 transition-colors duration-300 group-hover:text-white" />
                  </div>

                  {/* Content */}
                  {/* SCALING: text-lg/2xl -> text-lg/xl */}
                  <h3 className="mb-2 lg:mb-3 text-lg lg:text-xl font-semibold">
                    <span className="bg-gradient-to-r from-slate-200 to-white bg-clip-text text-transparent">
                      {step.title}
                    </span>
                  </h3>
                  {/* SCALING: text-sm/lg -> text-sm/base */}
                  <p className="max-w-xs text-sm lg:text-base text-slate-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
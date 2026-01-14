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
    <section className="relative overflow-hidden bg-slate-950 px-6 py-24 lg:py-40">
      <div className="relative z-10 mx-auto max-w-5xl lg:max-w-7xl">
        {/* Header */}
        <div className="mb-16 lg:mb-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl">
            <span className="bg-gradient-to-r from-slate-400 via-white to-slate-400 bg-clip-text text-transparent">
              Wie es funktioniert
            </span>
          </h2>
          <p className="mx-auto mt-4 lg:mt-8 max-w-xl lg:max-w-3xl text-slate-400 lg:text-2xl">
            In drei einfachen Schritten zu rasiermesserscharfen Klingen.
          </p>
        </div>

        {/* Steps Grid with connecting line */}
        <div className="relative">
          {/* Animated connecting line (desktop only) */}
          <div className="absolute top-20 lg:top-28 left-[16.67%] right-[16.67%] hidden md:block">
            <div className="h-[2px] w-full bg-slate-800 rounded-full overflow-hidden">
              {/* Animated beam */}
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
            className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step, index) => (
              <motion.div key={step.title} variants={cardVariants} className="group relative">
                {/* Glassmorphic Card */}
                <div className="relative flex flex-col items-center rounded-2xl lg:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 lg:p-12 text-center transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.07]">
                  {/* Step number badge */}
                  <div className="absolute -top-3 lg:-top-4 left-1/2 -translate-x-1/2 flex h-6 w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-xs lg:text-sm font-medium text-slate-300">
                    {index + 1}
                  </div>

                  {/* Icon with glow on hover */}
                  <div className="mb-6 lg:mb-8 flex h-16 w-16 lg:h-24 lg:w-24 items-center justify-center rounded-2xl lg:rounded-3xl border border-white/10 bg-slate-900/80 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(148,163,184,0.3)] group-hover:border-slate-500/50">
                    <step.icon className="h-8 w-8 lg:h-12 lg:w-12 text-slate-300 transition-colors duration-300 group-hover:text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 lg:mb-4 text-lg lg:text-2xl font-semibold">
                    <span className="bg-gradient-to-r from-slate-200 to-white bg-clip-text text-transparent">
                      {step.title}
                    </span>
                  </h3>
                  <p className="max-w-xs lg:max-w-md text-sm lg:text-lg text-slate-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

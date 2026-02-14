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
    <section id="ablauf" className="relative overflow-hidden px-6 pt-10 lg:pt-16 pb-20 lg:pb-32 -mt-8 lg:-mt-12">
      <div className="relative z-10 mx-auto max-w-5xl lg:max-w-6xl">

        {/* Header */}
        <motion.div
          className="mb-16 lg:mb-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-slate-200/60 bg-white text-sm lg:text-sm font-medium text-slate-600 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
            Einfacher Ablauf
          </span>

          <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-6xl mb-5">
            <span className="text-slate-900">
              Wie es funktioniert
            </span>
          </h2>

          <p className="mx-auto max-w-2xl lg:max-w-3xl text-slate-500 text-lg lg:text-xl font-light leading-relaxed">
            In drei einfachen Schritten zu rasiermesserscharfen Klingen.
          </p>
        </motion.div>

        {/* Steps Grid with connecting line */}
        <div className="relative">
          {/* Animated connecting line (desktop only) */}
          <div className="absolute top-16 lg:top-24 left-[16.67%] right-[16.67%] hidden md:block">
            <div className="h-0.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full w-1/3 bg-linear-to-r from-transparent via-emerald-400 to-transparent"
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
            className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step, index) => (
              <motion.div key={step.title} variants={cardVariants} className="group relative">
                {/* Clean White Card */}
                <div className="relative flex flex-col items-center rounded-2xl lg:rounded-3xl border border-slate-200/60 bg-white p-6 lg:p-10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-lg shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">

                  {/* Step number badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-6 w-6 lg:h-7 lg:w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-medium text-white">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 lg:mb-8 flex h-14 w-14 lg:h-20 lg:w-20 items-center justify-center rounded-2xl lg:rounded-3xl border border-slate-100 bg-slate-50 transition-all duration-300 group-hover:bg-emerald-50 group-hover:border-emerald-200">
                    <step.icon className="h-7 w-7 lg:h-10 lg:w-10 text-slate-600 transition-colors duration-300 group-hover:text-emerald-600" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 lg:mb-3 text-lg lg:text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="max-w-xs text-sm lg:text-base text-slate-500">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 py-24 lg:py-40 text-center">
      {/* Central Industrial Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Großer, statischer Schein für Tiefe */}
        <div className="absolute h-[30vw] w-[30vw] min-h-[500px] min-w-[500px] rounded-full bg-slate-800/20 blur-[100px]" />
        {/* Kleinerer, langsam pulsierender Kern */}
        <div className="absolute h-[25vw] w-[25vw] min-h-[300px] min-w-[300px] rounded-full bg-slate-700/10 blur-[80px] animate-pulse duration-1000" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl lg:max-w-5xl space-y-8 lg:space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 lg:px-8 lg:py-3 text-sm lg:text-lg text-slate-300">
            Professioneller Messerschleifservice
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-8xl"
        >
          <span className="text-slate-100">Willkommen bei </span>
          <span className="bg-gradient-to-r from-slate-400 via-white to-slate-400 bg-clip-text text-transparent">
            FEINSCHLIFF
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-xl lg:max-w-3xl text-pretty text-lg text-slate-400 sm:text-xl lg:text-2xl"
        >
          Wir bringen Ihre Messer wieder auf Höchstleistung. Präzise, zuverlässig und mit Leidenschaft für Qualität.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-4 lg:gap-8 sm:flex-row sm:justify-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="min-w-[180px] lg:min-w-[260px] lg:h-16 lg:text-xl lg:px-10 
                       border-slate-600 bg-transparent text-slate-200 
                       hover:bg-slate-800 hover:border-slate-500 hover:text-white
                       transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection("preise")}
          >
            Unsere Preise
          </Button>

          <Button
            size="lg"
            className="min-w-[180px] lg:min-w-[260px] lg:h-16 lg:text-xl lg:px-10 
                       bg-white text-slate-900 
                       hover:bg-slate-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]
                       transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection("termin")}
          >
            Termin buchen
          </Button>
        </motion.div>
      </motion.div>

      {/* Smooth Blend to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-slate-950 pointer-events-none" />
    </section>
  )
}

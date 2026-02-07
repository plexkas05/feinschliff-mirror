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
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-6 py-16 lg:py-28 text-center">

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl lg:max-w-6xl space-y-6 lg:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center rounded-full border border-slate-200/60 bg-white px-4 py-1.5 lg:px-6 lg:py-2 text-sm font-medium text-slate-600 tracking-wide shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
            Professioneller Messerschleifservice
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="flex flex-col items-center justify-center"
        >
          {/* Intro: Kleiner, grau, elegant (Apple-Style Subline) */}
          <span className="block text-slate-500 font-medium text-2xl md:text-4xl mb-1 md:mb-2">
            Willkommen bei
          </span>
          
          {/* Main: Massiv, Schwarzgrau, Solid (Apple-Style Headline) */}
          <span className="block text-slate-900 font-black text-6xl md:text-8xl tracking-tighter">
            FEINSCHLIFF
          </span>
        </motion.h1>
        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-2xl lg:max-w-4xl text-pretty text-lg text-slate-500 sm:text-xl lg:text-2xl font-light leading-relaxed"
        >
          Wir bringen Ihre Messer wieder auf Höchstleistung. <br className="hidden md:block" />
          Präzise, zuverlässig und mit Leidenschaft für Qualität.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-3 lg:gap-4 sm:flex-row sm:justify-center pt-4 lg:pt-6"
        >
          {/* Secondary Button */}
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-12 lg:h-14 px-6 lg:px-8 text-base font-medium border-slate-200/60 bg-white text-slate-700 hover:bg-white hover:border-slate-300 hover:text-slate-900 transition-all duration-300 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]"
            onClick={() => scrollToSection("preise")}
          >
            Unsere Preise
          </Button>

          {/* Primary Button */}
          <Button
            size="lg"
            className="w-full sm:w-auto h-12 lg:h-14 px-6 lg:px-8 text-base font-medium bg-slate-900 text-white hover:bg-slate-800 transition-all duration-300 shadow-sm"
            onClick={() => scrollToSection("termin")}
          >
            Termin buchen
          </Button>
        </motion.div>
      </motion.div>


    </section>
  )
}

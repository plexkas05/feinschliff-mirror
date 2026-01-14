"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

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
    // SCALING: min-h-[95vh] -> min-h-[80vh], py-40 -> py-28
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 lg:py-28 text-center">
      
      {/* 1. Background: Scaled down glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* SCALING: min-w-[400px] -> min-w-[320px] */}
        <div className="absolute h-[40vw] w-[40vw] min-h-[320px] min-w-[320px] rounded-full bg-slate-800/20 blur-[80px]" />
        <div className="absolute h-[25vw] w-[25vw] min-h-[200px] min-w-[200px] rounded-full bg-slate-700/10 blur-[60px] animate-pulse duration-1000" />
      </div>


      {/* Content */}
      <motion.div
        // SCALING: space-y-12 -> space-y-8
        className="relative z-10 max-w-4xl lg:max-w-6xl space-y-6 lg:space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          {/* SCALING: px-8 -> px-6, text-base -> text-sm */}
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 lg:px-6 lg:py-2 text-sm font-medium text-slate-300 tracking-wide">
            Professioneller Messerschleifservice
          </div>
        </motion.div>

        {/* Headline: SCALING text-9xl -> text-7xl/8xl */}
        <motion.h1
          variants={itemVariants}
          className="text-balance text-5xl font-extrabold tracking-tighter sm:text-6xl lg:text-8xl"
        >
          {/* SCALING: mb-4 -> mb-2 */}
          <span className="text-white block mb-2">Willkommen bei</span>
          <span className="bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent drop-shadow-2xl">
            FEINSCHLIFF
          </span>
        </motion.h1>

        {/* Subheadline: SCALING text-3xl -> text-xl/2xl */}
        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-2xl lg:max-w-4xl text-pretty text-lg text-slate-300 sm:text-xl lg:text-2xl font-light leading-relaxed"
        >
          Wir bringen Ihre Messer wieder auf Höchstleistung. <br className="hidden md:block"/>
          Präzise, zuverlässig und mit Leidenschaft für Qualität.
        </motion.p>

        {/* Buttons: SCALING h-20 -> h-14, text-xl -> text-base */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-3 lg:gap-4 sm:flex-row sm:justify-center pt-4 lg:pt-6"
        >
          {/* Secondary Button */}
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-12 lg:h-14 px-6 lg:px-8 text-base font-medium border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
            onClick={() => scrollToSection("preise")}
          >
            Unsere Preise
          </Button>

          {/* Primary Button */}
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-12 lg:h-14 px-6 lg:px-8 text-base font-medium border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
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
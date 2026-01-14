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
    <section className="relative flex min-h-[95vh] flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 py-24 lg:py-40 text-center">
      
      {/* 1. Background: Central Industrial Glow (Dezent & Mittig) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Großer Schein: 48vw */}
        <div className="absolute h-[40vw] w-[40vw] min-h-[400px] min-w-[400px] rounded-full bg-slate-800/20 blur-[100px]" />
        {/* Pulsierender Kern: 32vw */}
        <div className="absolute h-[25vw] w-[25vw] min-h-[240px] min-w-[240px] rounded-full bg-slate-700/10 blur-[80px] animate-pulse duration-1000" />
      </div>

      {/* 2. Atmosphere: Subtle Noise Texture (Studio Grain) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl lg:max-w-6xl space-y-8 lg:space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 lg:px-8 lg:py-2.5 text-sm lg:text-base font-medium text-slate-300 tracking-wide">
            Professioneller Messerschleifservice
          </div>
        </motion.div>

        {/* Headline: Massive Scale */}
        <motion.h1
          variants={itemVariants}
          className="text-balance text-6xl font-extrabold tracking-tighter sm:text-7xl md:text-6xl lg:text-9xl"
        >
          <span className="text-white block mb-2 lg:mb-4">Willkommen bei</span>
          <span className="bg-gradient-to-b from-white via-slate-200 to-slate-500 bg-clip-text text-transparent drop-shadow-2xl">
            FEINSCHLIFF
          </span>
        </motion.h1>

        {/* Subheadline: Improved Readability */}
        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-2xl lg:max-w-4xl text-pretty text-xl text-slate-300 sm:text-2xl lg:text-3xl font-light leading-relaxed"
        >
          Wir bringen Ihre Messer wieder auf Höchstleistung. <br className="hidden md:block"/>
          Präzise, zuverlässig und mit Leidenschaft für Qualität.
        </motion.p>

        {/* Buttons: High Contrast Ecosystem */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-4 lg:gap-6 sm:flex-row sm:justify-center pt-4 lg:pt-8"
        >
          {/* Secondary: Glassmorphic (Preise) */}
          <Button
            variant="outline"
            size="lg"
            // HIER GEÄNDERT: h-16/h-20, text-lg/xl, px-8/12
            className="w-full sm:w-auto h-16 lg:h-20 px-8 lg:px-12 text-lg lg:text-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
            onClick={() => scrollToSection("preise")}
          >
            Unsere Preise
          </Button>

          {/* Primary: Solid White (Termin) - HIER WAR VORHER DER FALSCHE STYLE DRIN */}
          <Button
            variant="outline"
            size="lg"
            // HIER GEÄNDERT: h-16/h-20, text-lg/xl, px-8/12 und bg-white (Inverted)
            className="w-full sm:w-auto h-16 lg:h-20 px-8 lg:px-12 text-lg lg:text-xl border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
            onClick={() => scrollToSection("termin")}
          >
            Termin buchen
          </Button>
        </motion.div>
      </motion.div>

      {/* Smooth Blend to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-slate-950 pointer-events-none" />
    </section>
  )
}
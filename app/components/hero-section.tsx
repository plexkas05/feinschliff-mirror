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
        staggerChildren: 0.1, // Schnelleres Stagger für flüssigeren Look
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Weniger Weg (20 statt 30) wirkt ruhiger
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98] as const, // Hochwertiges "Ease-Out"
      },
    },
  }

  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 py-16 lg:py-24 text-center">
      
      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50/50 px-4 py-1.5 text-sm font-medium text-slate-500 backdrop-blur-sm">
            Messerschleifservice Seiersberg
          </span>
        </motion.div>

        {/* Headline: Editorial Style */}
        <motion.h1
          variants={itemVariants}
          className="text-balance text-5xl sm:text-7xl lg:text-8xl tracking-tighter leading-[0.95]"
        >
          {/* Oberer Teil: Etwas leichter, grau */}
          <span className="block font-medium text-slate-400 mb-2 lg:mb-4">
            Der perfekte
          </span>
          {/* Unterer Teil: Fett, dunkel (aber nicht schwarz) */}
          <span className="block font-bold text-slate-800">
            Schnitt für dich.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-2xl text-pretty text-lg text-slate-500 sm:text-xl font-normal leading-relaxed tracking-tight"
        >
          Wir bringen deine Messer zurück in Bestform. <br className="hidden md:block" />
          Präzises Handwerk, direkt vor deiner Haustür.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center pt-8"
        >
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-12 px-8 text-base font-medium border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
            onClick={() => scrollToSection("preise")}
          >
            Preise ansehen
          </Button>

          <Button
            size="lg"
            className="w-full sm:w-auto h-12 px-8 text-base font-medium bg-slate-800 text-white hover:bg-slate-700 transition-all shadow-md hover:shadow-lg"
            onClick={() => scrollToSection("termin")}
          >
            Termin buchen
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
"use client"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Placeholder slides - swap these for real <Image /> components later
const slides = [
  {
    id: 1,
    // Replace with: src="/images/hero-1.jpg"
    bg: "bg-slate-800",
    alt: "Professionelles Messerschleifen",
  },
  {
    id: 2,
    // Replace with: src="/images/hero-2.jpg"
    bg: "bg-slate-700",
    alt: "Handwerk und Praezision",
  },
  {
    id: 3,
    // Replace with: src="/images/hero-3.jpg"
    bg: "bg-slate-900",
    alt: "Rasiermesserscharfe Ergebnisse",
  },
]

const SLIDE_INTERVAL = 7000

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(nextSlide, SLIDE_INTERVAL)
    return () => clearInterval(timer)
  }, [nextSlide])

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
        delayChildren: 0.3,
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
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden">

      {/* Background Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            {/* 
              Placeholder colored div. 
              To use real images, replace the div below with:
              <Image src={slides[currentSlide].src} alt={slides[currentSlide].alt} fill className="object-cover" priority />
            */}
            <div className={`absolute inset-0 ${slides[currentSlide].bg}`} />
          </motion.div>
        </AnimatePresence>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Subtle vignette for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
        aria-label="Vorheriges Bild"
      >
        <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
        aria-label="Nächstes Bild"
      >
        <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentSlide
                ? "w-8 bg-white"
                : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Gehe zu Bild ${index + 1}`}
          />
        ))}
      </div>

      {/* Static Foreground Content */}
      <motion.div
        className="relative z-10 max-w-4xl lg:max-w-6xl space-y-6 lg:space-y-8 px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 lg:px-6 lg:py-2 text-sm font-medium text-white/90 tracking-wide">
            Professioneller Messerschleifservice
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="flex flex-col items-center justify-center"
        >
          <span className="block text-white/70 font-medium text-2xl md:text-4xl mb-1 md:mb-2">
            Willkommen bei
          </span>
          <span className="block text-white font-black text-6xl md:text-8xl tracking-tighter">
            FEINSCHLIFF
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-2xl lg:max-w-4xl text-pretty text-lg text-white/70 sm:text-xl lg:text-2xl font-light leading-relaxed"
        >
          Wir bringen Ihre Messer wieder auf Höchstleistung. <br className="hidden md:block" />
          Präzise, zuverlässig und mit Leidenschaft für Qualität.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-3 lg:gap-4 sm:flex-row sm:justify-center pt-4 lg:pt-6"
        >
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto h-12 lg:h-14 px-6 lg:px-8 text-base font-medium border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
            onClick={() => scrollToSection("preise")}
          >
            Unsere Preise
          </Button>

          <Button
            size="lg"
            className="w-full sm:w-auto h-12 lg:h-14 px-6 lg:px-8 text-base font-medium bg-white text-slate-900 hover:bg-white/90 transition-all duration-300 shadow-lg shadow-black/20"
            onClick={() => scrollToSection("termin")}
          >
            Termin buchen
          </Button>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade for smooth transition into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 lg:h-40 bg-gradient-to-t from-[#f3f4f6] to-transparent z-10 pointer-events-none" />
    </section>
  )
}

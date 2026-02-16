"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useCallback, useRef } from "react"
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react"

const slides = [
  {
    id: 1,
    src: "/knife2.jpg",
    alt: "Professionelles Messerschleifen",
  },
  {
    id: 2,
    src: "/knifes1.jpg",
    alt: "Handwerk und Präzision",
  },
  {
    id: 3,
    src: "/knife1.jpg",
    alt: "Rasiermesserscharfe Ergebnisse",
  },
  {
    id: 4,
    src: "/knife3.jpg",
    alt: "Rasiermesserscharfe Ergebnisse",
  },
]

const SLIDE_INTERVAL = 7000

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, SLIDE_INTERVAL)

    return () => clearInterval(timer)
  }, [currentSlide])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const deltaX = e.changedTouches[0].clientX - touchStartX.current
    const deltaY = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX < 0) nextSlide()
      else prevSlide()
    }
    touchStartX.current = null
    touchStartY.current = null
  }, [nextSlide, prevSlide])

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
    <section
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-slate-900 touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Slider */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.0 },
              scale: { duration: 6.0 },
            }}
            className="absolute inset-0"
          >
            <Image
              src={slides[currentSlide].src}
              alt={slides[currentSlide].alt}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] z-10" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
        aria-label="Vorheriges Bild"
      >
        <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
        aria-label="Nächstes Bild"
      >
        <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
      </button>

      {/* Scroll Indicator */}
      <motion.div
        className="hidden md:flex absolute bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2 z-20 flex-col items-center cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.2 }}
        onClick={() => {
          const el = document.getElementById("ablauf")
          if (el) el.scrollIntoView({ behavior: "smooth" })
        }}
        role="button"
        aria-label="Zum Inhalt scrollen"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium mb-2">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="w-px h-5 bg-gradient-to-b from-white/50 to-transparent mb-0.5" />
          <ChevronDown className="h-4 w-4 text-white/50" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`cursor-pointer rounded-full transition-all duration-500 ${
              index === currentSlide
                ? "h-1.5 w-8 bg-white"
                : "h-1.5 w-1.5 bg-white/40 hover:bg-white/70 hover:scale-125"
            }`}
            aria-label={`Gehe zu Bild ${index + 1}`}
          />
        ))}
      </div>

      {/* Static Foreground Content */}
      <motion.div
        className="relative z-30 max-w-4xl lg:max-w-6xl space-y-6 lg:space-y-8 px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 lg:px-6 lg:py-2 text-sm font-medium text-white/90 tracking-wide">
            Professioneller Messerschleifservice
          </div>
        </motion.div>

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

        <motion.p
          variants={itemVariants}
          className="mx-auto max-w-2xl lg:max-w-4xl text-pretty text-lg text-white/70 sm:text-xl lg:text-2xl font-light leading-relaxed"
        >
          Wir bringen Ihre Messer wieder auf Höchstleistung.{" "}
          <br className="hidden md:block" />
          Präzise, zuverlässig und mit Leidenschaft für Qualität.
        </motion.p>

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
    </section>
  )
}

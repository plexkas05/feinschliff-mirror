"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Prüfen, ob der User schon zugestimmt hat
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Kurze Verzögerung, damit es nicht sofort ins Gesicht springt
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "true")
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="fixed bottom-4 left-4 right-4 md:left-8 md:bottom-8 z-100 max-w-lg mx-auto md:mx-0"
        >
          <div className="bg-slate-900/95 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl flex flex-col gap-4">
            <div className="space-y-2">
              <h3 className="text-white font-bold text-lg">Datenschutz & Cookies 🍪</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Wir nutzen Cookies und externe Dienste (wie Google Maps), um dir das beste Erlebnis zu bieten. 
                Ohne diese Dienste funktioniert die Karte leider nicht.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button 
                onClick={acceptCookies}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex-1 h-10 shadow-lg shadow-emerald-900/20"
              >
                Alles akzeptieren
              </Button>
              <Button 
                variant="outline" 
                asChild
                className="border-white/10 text-slate-300 hover:bg-white/5 hover:text-white flex-1 h-10"
              >
                <Link href="/datenschutz">
                  Mehr Infos
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
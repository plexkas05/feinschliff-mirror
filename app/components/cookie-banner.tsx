"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation" // WICHTIG: Damit wissen wir, wo wir sind
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname() // Holt den aktuellen Pfad (z.B. "/datenschutz")

  // Prüfen: Sind wir gerade auf der Datenschutz-Seite?
  const isPrivacyPage = pathname === "/datenschutz"

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={cn(
            "fixed z-100 mx-auto md:mx-0 shadow-lg shadow-black/5 transition-all duration-500",
            // DYNAMISCHE POSITION & GRÖSSE:
            isPrivacyPage 
              ? "bottom-0 left-0 right-0 max-w-full rounded-t-xl" // Auf Datenschutz: Unten angedockt, volle Breite, flach
              : "bottom-4 left-4 right-4 md:left-8 md:bottom-8 max-w-lg rounded-2xl" // Sonst: Schwebende Box links
          )}
        >
          <div className={cn(
            "bg-white/90 backdrop-blur-lg border border-slate-200/60 flex flex-col transition-all",
            isPrivacyPage ? "p-4 flex-row items-center justify-between gap-4 rounded-t-xl" : "p-6 gap-4 rounded-2xl"
          )}>
            
            {/* INHALT: Zeige Text nur, wenn NICHT auf Datenschutz-Seite */}
            {!isPrivacyPage ? (
              <div className="space-y-2">
                <h3 className="text-slate-900 font-bold text-lg">{"Datenschutz & Cookies \uD83C\uDF6A"}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Wir nutzen Cookies und externe Dienste (wie Google Maps), um dir das beste Erlebnis zu bieten. 
                  Ohne diese Dienste funktioniert die Karte leider nicht.
                </p>
              </div>
            ) : (
              // Kurzfassung für die Datenschutz-Seite
              <p className="text-slate-600 text-sm font-medium">
                Bitte stimme zu, um alle Funktionen (z.B. Karte) zu nutzen.
              </p>
            )}
            
            {/* BUTTONS */}
            <div className={cn("flex gap-3", isPrivacyPage ? "w-auto shrink-0" : "flex-col sm:flex-row w-full pt-2")}>
              <Button 
                onClick={acceptCookies}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-900/20 whitespace-nowrap"
              >
                Alles akzeptieren
              </Button>

              {/* "Mehr Infos"-Button NUR anzeigen, wenn wir NICHT schon dort sind */}
              {!isPrivacyPage && (
                <Button 
                  variant="outline" 
                  asChild
                  className="border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-slate-800 flex-1"
                >
                  <Link href="/datenschutz">
                    Mehr Infos
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

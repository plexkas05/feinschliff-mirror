"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Scroll-Effekt: Erst ab 50px scrollen anzeigen (damit es nicht flackert)
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Klick außerhalb schließt Dropdown
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const menuItems = [
    { name: "Startseite", href: "/" },
    { name: "Preise", href: "/#preise" },
    { name: "Ablauf", href: "/#ablauf" },
    { name: "Über uns", href: "/ueber-uns" },
    { name: "Kontakt", href: "/ueber-uns#kontakt" },
  ]

  return (
    <header
      className={cn(
        // GRUNDLAGE: Fixiert, Z-Index hoch, Transition für weiches Einblenden
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        
        // ZUSTAND 1: GANZ OBEN (Unsichtbar & weg)
        !isScrolled && "-translate-y-full opacity-0 pointer-events-none py-6",

        // ZUSTAND 2: GESCROLLT (Sichtbar & Dein Original-Style)
        // Identisch zum vorherigen "Scrolled"-Look: Slate-900, Blur, Border unten
        isScrolled && "translate-y-0 opacity-100 pointer-events-auto bg-slate-900/95 backdrop-blur-md py-3 border-b border-white/10 shadow-lg"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group z-50 relative">
          <span className="text-xl font-bold tracking-tighter text-white group-hover:text-emerald-400 transition-colors">
            FEINSCHLIFF
          </span>
        </Link>

        {/* DESKTOP NAV (Mit Dropdown) */}
        <div className="hidden md:flex items-center gap-8">
          
          {/* Das Dropdown Menü */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors focus:outline-none"
            >
              Menü
              <ChevronDown className={cn("w-4 h-4 transition-transform", isDropdownOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-4 w-48 rounded-xl border border-white/10 bg-slate-900 p-2 shadow-xl ring-1 ring-black/5"
                >
                  <div className="flex flex-col gap-1">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block w-full rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-emerald-400 transition-colors text-left"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* CTA Button */}
          <Link href="/#termin">
            <Button 
              size="sm" 
              className="bg-emerald-600 text-white hover:bg-emerald-500 border-none font-medium shadow-md hover:shadow-emerald-900/20 transition-all"
            >
              Jetzt buchen
            </Button>
          </Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          className="md:hidden text-slate-300 hover:text-emerald-400 transition-colors z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU FULLSCREEN OVERLAY */}
      <div className={cn(
        "fixed inset-0 bg-slate-950/98 backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-8 transition-all duration-300 md:hidden",
        isMobileMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
      )}>
        <nav className="flex flex-col items-center gap-6 w-full px-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-2xl font-bold text-slate-300 hover:text-emerald-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <div className="mt-4">
            <Link href="/#termin" onClick={() => setIsMobileMenuOpen(false)}>
              <Button 
                size="lg" 
                className="bg-emerald-600 text-white hover:bg-emerald-500 w-full min-w-50 text-lg font-medium shadow-lg shadow-emerald-900/20"
              >
                Jetzt buchen
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
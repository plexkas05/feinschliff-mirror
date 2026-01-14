"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, User, Mail, Tag, Workflow } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { scrollY } = useScroll()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Detect Scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20)
  })

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    setDropdownOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-neutral-950/90 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          href="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer group"
        >
          <span className="text-xl lg:text-2xl font-bold tracking-tighter text-white transition-colors">
            FEINSCHLIFF
          </span>
        </Link>

        {/* Actions (Desktop Dropdown & CTA) */}
        <div className="flex items-center gap-6">
          
          {/* DESKTOP DROPDOWN */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition-colors focus:outline-none"
            >
              Menü
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-4 w-56 rounded-xl border border-white/10 bg-neutral-950 p-2 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="space-y-1">
                    {/* Navigation Links */}
                    <button
                      onClick={() => scrollToSection("preise")}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <Tag className="w-4 h-4 text-slate-500" />
                      Preise
                    </button>
                    <button
                      onClick={() => scrollToSection("ablauf")}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <Workflow className="w-4 h-4 text-slate-500" />
                      Ablauf
                    </button>

                    <div className="my-1 h-px bg-white/10" />

                    {/* FIX: Jetzt echte Links statt Platzhalter */}
                    <Link
                      href="/ueber-uns"
                      onClick={() => setDropdownOpen(false)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      Über uns
                    </Link>
                    <Link
                      href="/ueber-uns#kontakt"
                      onClick={() => setDropdownOpen(false)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <Mail className="w-4 h-4 text-slate-500" />
                      Kontakt
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Button */}
          <Button 
            className="hidden md:inline-flex h-10 px-6 bg-white text-neutral-950 hover:bg-slate-200 font-bold text-sm transition-all"
            onClick={() => scrollToSection("termin")}
          >
            Jetzt buchen
          </Button>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-neutral-950 border-b border-white/10 p-6 md:hidden flex flex-col gap-4 shadow-2xl"
        >
          <button onClick={() => scrollToSection("preise")} className="text-lg font-medium text-slate-300 py-2 text-left hover:text-white">
            Preise
          </button>
          <button onClick={() => scrollToSection("ablauf")} className="text-lg font-medium text-slate-300 py-2 text-left hover:text-white">
            Ablauf
          </button>
          
          {/* FIX: Mobile Links mit Menu-Close Logik und passendem Styling */}
          <Link
            href="/ueber-uns"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-slate-300 py-2 text-left hover:text-white flex items-center gap-2"
          >
            Über uns
          </Link>

          <Link
            href="/ueber-uns#kontakt"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-slate-300 py-2 text-left hover:text-white flex items-center gap-2"
          >
            Kontakt
          </Link>

          <Button 
            className="w-full bg-white text-neutral-950 font-bold mt-4 h-12 text-lg"
            onClick={() => scrollToSection("termin")}
          >
            Jetzt buchen
          </Button>
        </motion.div>
      )}
    </motion.header>
  )
}
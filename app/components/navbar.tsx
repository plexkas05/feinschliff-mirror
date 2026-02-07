"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, User, Mail, Tag, Workflow } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { scrollY } = useScroll()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const pathname = usePathname()

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

  const handleNavigation = (id: string) => {
    setMobileMenuOpen(false)
    setDropdownOpen(false)
    if (pathname === "/") {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      router.push(`/#${id}`)
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/80 py-3 shadow-sm" // Gescrollt: Sehr kompakt, Weiß, hoher Blur
          : "bg-slate-200/70 backdrop-blur-md border-b border-slate-300/60 py-4"      // Oben: Kompakter als vorher, deutlicherer Kontrast (Grau)
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => {
            if (pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="cursor-pointer group"
        >
          <span className="text-xl lg:text-2xl font-bold tracking-tighter text-slate-900 transition-colors">
            FEINSCHLIFF
          </span>
        </Link>

        {/* Actions (Desktop Dropdown & CTA) */}
        <div className="flex items-center gap-6">
          {/* DESKTOP DROPDOWN */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors focus:outline-none"
            >
              Menu
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-4 w-56 rounded-xl border border-slate-200/60 bg-white p-2 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] ring-1 ring-black/5 focus:outline-none"
                >
                  <div className="space-y-1">
                    <button
                      onClick={() => handleNavigation("preise")}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <Tag className="w-4 h-4 text-slate-400" />
                      Preise
                    </button>
                    <button
                      onClick={() => handleNavigation("ablauf")}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <Workflow className="w-4 h-4 text-slate-400" />
                      Ablauf
                    </button>
                    <div className="my-1 h-px bg-slate-100" />
                    <Link
                      href="/ueber-uns"
                      onClick={() => setDropdownOpen(false)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      Über uns
                    </Link>
                    <Link
                      href="/ueber-uns#kontakt"
                      onClick={() => setDropdownOpen(false)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-slate-400" />
                      Kontakt
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CTA Button */}
          <Button
            className="hidden md:inline-flex h-10 px-6 font-medium text-sm transition-all border border-slate-200/60 bg-white text-slate-700 hover:bg-white hover:text-slate-900 hover:border-slate-300 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]"
            onClick={() => handleNavigation("termin")}
          >
            Jetzt buchen
          </Button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
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
          className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 p-6 md:hidden flex flex-col gap-4 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]"
        >
          <button
            onClick={() => handleNavigation("preise")}
            className="text-lg font-medium text-slate-600 py-2 text-left hover:text-slate-900"
          >
            Preise
          </button>
          <button
            onClick={() => handleNavigation("ablauf")}
            className="text-lg font-medium text-slate-600 py-2 text-left hover:text-slate-900"
          >
            Ablauf
          </button>
          <Link
            href="/ueber-uns"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-slate-600 py-2 text-left hover:text-slate-900 flex items-center gap-2"
          >
            Über uns
          </Link>
          <Link
            href="/ueber-uns#kontakt"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg font-medium text-slate-600 py-2 text-left hover:text-slate-900 flex items-center gap-2"
          >
            Kontakt
          </Link>

          <Button
            className="w-full bg-slate-900 text-white font-semibold mt-4 h-12 text-lg hover:bg-slate-800"
            onClick={() => handleNavigation("termin")}
          >
            Jetzt buchen
          </Button>
        </motion.div>
      )}
    </motion.header>
  )
}
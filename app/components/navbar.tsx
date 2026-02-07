"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        // BASE: Immer dunkel (Slate-900), Text immer weiß.
        // Transition für weichen Übergang.
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        // INITIAL (oben): Solide, etwas mehr Padding -> Wirkt stabil.
        !isScrolled && "bg-slate-900 py-5 border-b border-transparent",
        // SCROLLED: Etwas transparenter (95%), Blur, weniger Padding, feine Linie unten.
        isScrolled && "bg-slate-900/95 backdrop-blur-md py-3 border-b border-white/10 shadow-lg"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold tracking-tighter text-white group-hover:text-emerald-400 transition-colors">
            FEINSCHLIFF
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {["Preise", "Ablauf", "Termin"].map((item) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase()}`}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
          <Link
            href="/ueber-uns"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Über uns
          </Link>
          
          <Link href="/#termin">
            <Button 
              size="sm" 
              className="bg-emerald-600 text-white hover:bg-emerald-500 border-none font-medium shadow-md hover:shadow-emerald-900/20"
            >
              Jetzt buchen
            </Button>
          </Link>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 p-6 flex flex-col gap-4 shadow-xl">
          {["Preise", "Ablauf", "Termin"].map((item) => (
            <Link
              key={item}
              href={`/#${item.toLowerCase()}`}
              className="text-lg font-medium text-slate-300 hover:text-emerald-400"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link
            href="/ueber-uns"
            className="text-lg font-medium text-slate-300 hover:text-emerald-400"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Über uns
          </Link>
        </div>
      )}
    </header>
  )
}
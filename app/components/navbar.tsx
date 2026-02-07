"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // Scroll-Effekt: Navbar wird transparent beim Scrollen
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Die 5 Menüpunkte in einer sauberen Liste
  const navItems = [
    { name: "Startseite", href: "/" },
    { name: "Ablauf", href: "/#ablauf" },
    { name: "Preise", href: "/#preise" },
    { name: "Über uns", href: "/ueber-uns" },
    { name: "Kontakt", href: "/ueber-uns#kontakt" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        // Initial: Solide und dunkel
        !isScrolled && "bg-slate-900 py-5 border-b border-transparent",
        // Beim Scrollen: Leicht transparent, Blur, etwas schmaler
        isScrolled && "bg-slate-900/90 backdrop-blur-md py-3 border-b border-white/5 shadow-lg"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group z-50 relative">
          <span className="text-xl font-bold tracking-tighter text-white group-hover:text-emerald-400 transition-colors">
            FEINSCHLIFF
          </span>
        </Link>

        {/* DESKTOP NAVIGATION (Rechts) */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.slice(1).map((item) => ( // Startseite auf Desktop oft redundant im Logo, daher slice(1) optional, aber hier alle anzeigen wenn gewünscht
             <Link
               key={item.name}
               href={item.href}
               className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors"
             >
               {item.name}
             </Link>
          ))}
          
          {/* CTA Button */}
          <Link href="/#termin">
            <Button 
              size="sm" 
              className="bg-emerald-600 text-white hover:bg-emerald-500 border-none font-medium shadow-md hover:shadow-emerald-900/20 transition-all"
            >
              Jetzt buchen
            </Button>
          </Link>
        </nav>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          className="md:hidden text-slate-300 hover:text-emerald-400 transition-colors z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE MENU FULLSCREEN OVERLAY */}
      {/* Wenn offen: Zeige Liste. Keine Striche, nur saubere Links. */}
      <div className={cn(
        "fixed inset-0 bg-slate-950/98 backdrop-blur-xl z-40 flex flex-col justify-center items-center gap-8 transition-all duration-300 md:hidden",
        isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      )}>
        <nav className="flex flex-col items-center gap-6 w-full px-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-2xl font-bold text-slate-300 hover:text-emerald-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile CTA Button */}
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
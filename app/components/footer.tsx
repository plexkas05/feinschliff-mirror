"use client"

import Link from "next/link"
import { Hammer, Instagram, Facebook, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-slate-950 pt-16 overflow-hidden">
      
      {/* Content Container (Scaled Down: max-w-6xl, text-sm/xs) */}
      <div className="container mx-auto px-6 max-w-6xl relative z-10 mb-12 lg:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-lg font-bold tracking-tighter text-white">
                FEINSCHLIFF
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 max-w-xs">
              Professioneller Messerschleifservice in Graz. 
              Wir bringen Schärfe zurück in deine Küche.
              Präzise, schnell und handwerklich perfekt.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Service</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/#preise" className="hover:text-emerald-400 transition-colors">Preise & Pakete</Link>
              </li>
              <li>
                <Link href="/#ablauf" className="hover:text-emerald-400 transition-colors">So funktioniert's</Link>
              </li>
              <li>
                <Link href="/#termin" className="hover:text-emerald-400 transition-colors">Termin buchen</Link>
              </li>
              <li>
                <Link href="/ueber-uns" className="hover:text-emerald-400 transition-colors">Über uns</Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Rechtliches</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/impressum" className="hover:text-emerald-400 transition-colors">Impressum</Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-emerald-400 transition-colors">Datenschutz</Link>
              </li>
              <li>
                <Link href="/agb" className="hover:text-emerald-400 transition-colors">AGB</Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Kontakt</h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-slate-500 shrink-0" />
                <span>
                  Rebenweg 12<br />
                  8054 Seiersberg
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-500 shrink-0" />
                <a href="mailto:felix.kastner27@gmail.com" className="hover:text-white transition-colors">
                  felix.kastner27@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-500 shrink-0" />
                <a href="tel:+436601628017" className="hover:text-white transition-colors">
                  +43 660 1628017
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600">
          <p>&copy; {currentYear} Feinschliff Graz. Alle Rechte vorbehalten.</p>
          <p className="flex items-center gap-1">
            Made with <Hammer className="h-3 w-3" /> in Styria
          </p>
        </div>
      </div>

      {/* MASSIVE BACKGROUND TEXT (SVG SOLUTION)
         - Skaliert exakt auf 100% Breite
         - Beginnt exakt links (x="0")
         - Kein Spalt, kein Abschneiden
      */}
      <div className="w-full select-none pointer-events-none leading-none opacity-[0.03]">
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 15" 
          preserveAspectRatio="none" // WICHTIG: Zwingt SVG über die volle Breite
          className="w-full h-auto block"
        >
          <text 
            x="0" 
            y="13" 
            fontFamily="Arial, sans-serif" 
            fontWeight="900" 
            fontSize="15" 
            fill="currentColor"
            className="text-white"
          >
            FEINSCHLIFF
          </text>
        </svg>
      </div>
      
    </footer>
  )
}
import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    // FIX: Changed background to neutral-950 (Matte Black) for visual grounding
    // FIX: Added border-t border-white/10 for a crisp separation line
    <footer className="relative bg-neutral-950 border-t border-white/10 overflow-hidden">
      
      {/* Large watermark text - Kept for High-End feel */}
      <div className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-bold tracking-tighter text-white/[0.02] leading-none block translate-x-[10%] translate-y-[20%]">
          FEINSCHLIFF
        </span>
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 py-12 md:py-16 lg:py-24 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:gap-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo & Slogan */}
          <div className="space-y-4 lg:space-y-6">
            <h3 className="text-xl lg:text-3xl font-bold tracking-tight text-slate-50">Feinschliff</h3>
            <p className="text-sm lg:text-lg text-slate-400 leading-relaxed">
              Professioneller Messerschleif-Service für Privat und Gastronomie. Schärfe, der man vertraut.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div className="space-y-4 lg:space-y-6">
            <h4 className="font-semibold lg:text-xl text-slate-50">Kontakt</h4>
            <ul className="space-y-3 lg:space-y-5 text-sm lg:text-lg">
              <li className="flex items-center gap-3 lg:gap-4">
                <Phone className="h-4 w-4 lg:h-6 lg:w-6 text-slate-500" />
                <a href="tel:+436601628017" className="text-slate-400 hover:text-white transition-colors duration-200">
                  +43 660 1628017
                </a>
              </li>
              <li className="flex items-center gap-3 lg:gap-4">
                <Mail className="h-4 w-4 lg:h-6 lg:w-6 text-slate-500" />
                <a
                  href="mailto:felix.kastner27@gmail.com"
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                >
                  felix.kastner27@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 lg:gap-4">
                <MapPin className="h-4 w-4 lg:h-6 lg:w-6 text-slate-500 mt-0.5" />
                <span className="text-slate-400">
                  Rebenweg 12
                  <br />
                  8054 Seiersberg
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-4 lg:space-y-6">
            <h4 className="font-semibold lg:text-xl text-slate-50">Rechtliches</h4>
            <ul className="space-y-3 lg:space-y-5 text-sm lg:text-lg">
              <li>
                <Link href="/impressum" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-slate-400 hover:text-white transition-colors duration-200">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/agb" className="text-slate-400 hover:text-white transition-colors duration-200">
                  AGB
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div className="space-y-4 lg:space-y-6">
            <h4 className="font-semibold lg:text-xl text-slate-50">Folge uns</h4>
            <div className="flex gap-4 lg:gap-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 lg:h-6 lg:w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 lg:h-6 lg:w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 lg:h-6 lg:w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 lg:mt-20 pt-8 lg:pt-12">
          <p className="text-center text-sm lg:text-lg text-slate-500">© 2026 Feinschliff. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}
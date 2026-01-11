import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16 lg:py-20 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Spalte 1: Logo & Slogan */}
          <div className="space-y-4 lg:space-y-6">
            <h3 className="text-xl lg:text-2xl font-bold tracking-tight">Feinschliff</h3>
            <p className="text-sm lg:text-base text-primary-foreground/70 leading-relaxed">
              Professioneller Messerschleif-Service für Privat und Gastronomie. Schärfe, der man vertraut.
            </p>
          </div>

          {/* Spalte 2: Kontakt */}
          <div className="space-y-4 lg:space-y-6">
            <h4 className="font-semibold lg:text-lg">Kontakt</h4>
            <ul className="space-y-3 lg:space-y-4 text-sm lg:text-base">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 lg:h-5 lg:w-5 text-primary-foreground/70" />
                <a
                  href="tel:+4917612345678"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  +49 176 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 lg:h-5 lg:w-5 text-primary-foreground/70" />
                <a
                  href="mailto:info@feinschliff.de"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  info@feinschliff.de
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 lg:h-5 lg:w-5 text-primary-foreground/70 mt-0.5" />
                <span className="text-primary-foreground/70">
                  Musterstraße 12
                  <br />
                  12345 Musterstadt
                </span>
              </li>
            </ul>
          </div>

          {/* Spalte 3: Rechtliches */}
          <div className="space-y-4 lg:space-y-6">
            <h4 className="font-semibold lg:text-lg">Rechtliches</h4>
            <ul className="space-y-3 lg:space-y-4 text-sm lg:text-base">
              <li>
                <Link
                  href="/impressum"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Impressum
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link
                  href="/agb"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  AGB
                </Link>
              </li>
            </ul>
          </div>

          {/* Spalte 4: Social Media */}
          <div className="space-y-4 lg:space-y-6">
            <h4 className="font-semibold lg:text-lg">Folge uns</h4>
            <div className="flex gap-4 lg:gap-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/70 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 lg:h-6 lg:w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/70 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 lg:h-6 lg:w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 lg:h-12 lg:w-12 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/70 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 lg:h-6 lg:w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 lg:mt-16 border-t border-primary-foreground/10 pt-8 lg:pt-10">
          <p className="text-center text-sm lg:text-base text-primary-foreground/50">
            © 2026 Feinschliff. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}

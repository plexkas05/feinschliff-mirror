import Link from "next/link"
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12 md:py-16 lg:py-24 max-w-7xl lg:max-w-[90rem]">
        <div className="grid grid-cols-1 gap-8 lg:gap-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Spalte 1: Logo & Slogan */}
          <div className="space-y-4 lg:space-y-6">
            <h3 className="text-xl lg:text-3xl font-bold tracking-tight">Feinschliff</h3>
            <p className="text-sm lg:text-lg text-primary-foreground/70 leading-relaxed">
              Professioneller Messerschleif-Service für Privat und Gastronomie. Schärfe, der man vertraut.
            </p>
          </div>

          {/* Spalte 2: Kontakt */}
          <div className="space-y-4 lg:space-y-6">
            <h4 className="font-semibold lg:text-xl">Kontakt</h4>
            <ul className="space-y-3 lg:space-y-5 text-sm lg:text-lg">
              <li className="flex items-center gap-3 lg:gap-4">
                <Phone className="h-4 w-4 lg:h-6 lg:w-6 text-primary-foreground/70" />
                <a
                  href="tel:+43 660 1628017"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  +43 660 1628017
                </a>
              </li>
              <li className="flex items-center gap-3 lg:gap-4">
                <Mail className="h-4 w-4 lg:h-6 lg:w-6 text-primary-foreground/70" />
                <a
                  href="mailto:felix.kastner27@gmail.com"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  felix.kastner27@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 lg:gap-4">
                <MapPin className="h-4 w-4 lg:h-6 lg:w-6 text-primary-foreground/70 mt-0.5" />
                <span className="text-primary-foreground/70">
                  Rebenweg 12
                  <br />
                  8054 Seiersberg
                </span>
              </li>
            </ul>
          </div>

          {/* Spalte 3: Rechtliches */}
          <div className="space-y-4 lg:space-y-6">
            <h4 className="font-semibold lg:text-xl">Rechtliches</h4>
            <ul className="space-y-3 lg:space-y-5 text-sm lg:text-lg">
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
            <h4 className="font-semibold lg:text-xl">Folge uns</h4>
            <div className="flex gap-4 lg:gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/70 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 lg:h-7 lg:w-7" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/70 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 lg:h-7 lg:w-7" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 lg:h-14 lg:w-14 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/70 hover:bg-primary-foreground/20 hover:text-primary-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 lg:h-7 lg:w-7" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 lg:mt-20 border-t border-primary-foreground/10 pt-8 lg:pt-12">
          <p className="text-center text-sm lg:text-lg text-primary-foreground/50">
            © 2026 Feinschliff. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  )
}

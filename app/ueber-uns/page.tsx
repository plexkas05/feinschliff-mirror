"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { MapPin, Mail, Phone, Hammer, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* 1. HERO: Story & Vision (JETZT HELL) */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background blobs (dezent grau statt grün-leuchtend) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-slate-100 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm font-medium mb-6">
              Seit 2026
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
              Handwerk aus <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-slate-600">
                Leidenschaft.
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Wir glauben daran, dass ein scharfes Messer nicht nur ein Werkzeug ist, 
              sondern die Freude am Kochen zurückbringt. Unser Ziel ist es jedes stumpfe Messer
              aus euren Küchen wieder in eine scharfe Klinge zu verwandeln.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. GALLERY: Team & Machines (JETZT HELL & CLEAN) */}
      <section className="py-20 px-6 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Text Block */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                  <Hammer className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Präzisionsmaschinen</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Wir nutzen wassergekühlte Tormek-Systeme, um den Stahl zu schonen 
                    und eine langlebige Schärfe zu garantieren. Kein Ausglühen, nur purer Schnitt.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                  <Heart className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Das Team</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Hinter Feinschliff stehen echte Menschen. Felix und sein Team kümmern sich 
                    persönlich um jede Klinge.
                  </p>
                </div>
              </div>
            </div>

            {/* IMAGES GRID (Platzhalter angepasst) */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center relative overflow-hidden group"
              >
                <span className="text-slate-400 font-medium group-hover:text-emerald-600 transition-colors">Foto: Maschine</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center relative overflow-hidden group mt-8"
              >
                <span className="text-slate-400 font-medium group-hover:text-emerald-600 transition-colors">Foto: Felix</span>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. KONTAKT SECTION (Anchor ID! - JETZT HELL) */}
      <section id="kontakt" className="py-24 px-6 relative bg-white">
        <div className="container mx-auto max-w-4xl">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Kontakt aufnehmen</h2>
            <p className="text-slate-600 text-lg">
              Du hast Fragen zu speziellen Messern, Gastronomie-Preisen oder willst einfach "Hallo" sagen?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Kontakt Details Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Erreichbarkeit</h3>
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-emerald-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Telefon / WhatsApp</p>
                    <a href="tel:+436601628017" className="text-slate-900 font-medium hover:text-emerald-600 transition-colors">+43 660 1628017</a>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-emerald-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">E-Mail</p>
                    <a href="mailto:felix.kastner27@gmail.com" className="text-slate-900 font-medium hover:text-emerald-600 transition-colors">felix.kastner27@gmail.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Werkstatt & Abgabe</p>
                    <span className="text-slate-900 font-medium block">Rebenweg 12</span>
                    <span className="text-slate-900 font-medium block">8054 Seiersberg</span>
                    <p className="text-xs text-slate-400 mt-2">Bitte vorher kurz anrufen.</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 relative min-h-[300px] group flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-slate-300 mx-auto mb-4 group-hover:text-emerald-500 transition-colors" />
                <span className="text-slate-400 font-medium">Karte wird geladen...</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
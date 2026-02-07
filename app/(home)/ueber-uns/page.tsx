"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { MapPin, Mail, Phone, Hammer, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50/30">
      <Navbar />

      {/* 1. HERO: Story & Vision */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        {/* Dezentere Background Blobs */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-slate-200/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white border border-slate-200 text-slate-500 text-sm font-medium mb-8 shadow-sm">
              Gegründet 2026
            </span>
            
            {/* Neue, minimalistische Typografie */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95] mb-10">
              <span className="block font-medium text-slate-400 mb-2">Handwerk aus</span>
              <span className="block font-bold text-slate-800">Leidenschaft.</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-light tracking-tight">
              Ein scharfes Messer ist mehr als ein Werkzeug – es ist Freude am Kochen. 
              Wir geben stumpfen Klingen ihren Charakter zurück.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. GALLERY: Team & Machines */}
      <section className="py-24 px-6 bg-white border-y border-slate-200/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Text Block */}
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <Hammer className="text-slate-700 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">Präzisionsmaschinen</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Wir nutzen wassergekühlte Tormek-Systeme, um den Stahl zu schonen
                    und eine langlebige Schärfe zu garantieren. Kein Ausglühen, nur purer Schnitt.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <Heart className="text-slate-700 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">Das Team</h3>
                  <p className="text-slate-500 leading-relaxed">
                    Hinter Feinschliff stehen echte Menschen. Felix und sein Team kümmern sich
                    persönlich um jede einzelne Klinge.
                  </p>
                </div>
              </div>
            </div>

            {/* IMAGES GRID */}
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="aspect-square rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center relative overflow-hidden group"
              >
                <span className="text-slate-400 font-medium text-sm">Foto: Maschine</span>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="aspect-square rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center relative overflow-hidden group mt-12"
              >
                <span className="text-slate-400 font-medium text-sm">Foto: Felix</span>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. KONTAKT SECTION */}
      <section id="kontakt" className="py-24 px-6 relative bg-slate-50/30">
        <div className="container mx-auto max-w-4xl">

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tighter mb-6">Kontakt aufnehmen</h2>
            <p className="text-slate-500 text-lg md:text-xl font-light">
              Fragen zu speziellen Messern oder Gastronomie-Preisen?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Kontakt Details Card */}
            <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-8 tracking-tight">Erreichbarkeit</h3>
              <ul className="space-y-8">
                <li className="flex items-center gap-5">
                  <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Telefon / WhatsApp</p>
                    <a href="tel:+436601628017" className="text-lg text-slate-800 hover:text-slate-600 transition-colors font-medium">+43 660 1628017</a>
                  </div>
                </li>
                <li className="flex items-center gap-5">
                  <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">E-Mail</p>
                    <a href="mailto:felix.kastner27@gmail.com" className="text-lg text-slate-800 hover:text-slate-600 transition-colors font-medium">felix.kastner27@gmail.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-5">
                  <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Werkstatt</p>
                    <span className="text-lg text-slate-800 font-medium block">Rebenweg 12</span>
                    <span className="text-lg text-slate-800 font-medium block">8054 Seiersberg</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 relative min-h-75 group shadow-sm flex items-center justify-center">
               <div className="text-center">
                  <MapPin className="h-12 w-12 text-slate-300 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
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
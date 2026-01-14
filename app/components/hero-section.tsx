"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Star } from "lucide-react"

export function HeroSection() {
  const scrollToBooking = () => {
    document.getElementById("termin")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    // PADDING UPDATE: pt-32 statt pt-40, pb-16 statt pb-32
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-16 px-4 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto max-w-5xl text-center z-10">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs md:text-sm text-slate-300 mb-6 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Jetzt Termine für Graz & Umgebung verfügbar
        </motion.div>

        {/* Headline: FONT SIZE UPDATE: text-4xl/text-6xl statt text-5xl/text-7xl */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight"
        >
          Gib deinen Messern <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-rose-200 animate-gradient-x">
            den ultimativen Schliff.
          </span>
        </motion.h1>

        {/* Subtitle: FONT SIZE UPDATE: text-base/text-lg statt text-xl */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Professioneller Nassschliff für deine Küchenmesser. <br className="hidden md:block" />
          Scharf wie am ersten Tag – oder schärfer. Abholung oder Bringservice.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* SIZE UPDATE: h-10/text-sm statt h-12/text-base */}
          <Button 
            size="lg" 
            onClick={scrollToBooking}
            className="h-12 px-8 text-base bg-white text-slate-950 hover:bg-slate-200 transition-all font-semibold rounded-full group w-full sm:w-auto"
          >
            Termin vereinbaren
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <div className="flex items-center gap-4 px-4 py-2">
            <div className="flex -space-x-3">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs text-white">
                    <UserIcon size={12} />
                 </div>
               ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-medium">100+ zufriedene Köche</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function UserIcon({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    )
}
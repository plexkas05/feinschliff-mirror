"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

// Wrapper für Suspense
export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <SuccessContent />
    </Suspense>
  )
}

function SuccessContent() {
  const searchParams = useSearchParams()
  
  const date = searchParams.get("date") || "Datum folgt"
  const service = searchParams.get("service") || "Messerschliff"
  const price = searchParams.get("price") || "0"
  const email = searchParams.get("email") || "deine Email"

  return (
    <main className="min-h-screen w-full bg-slate-950 flex items-center justify-center p-4 lg:p-8 overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-slate-950 to-slate-950 pointer-events-none" />

      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Top Decoration */}
        <div className="h-2 w-full bg-emerald-500" />

        <div className="p-8 lg:p-10 flex flex-col items-center text-center">
          
          {/* Animated Success Icon (Der Große bleibt!) */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6 rounded-full bg-emerald-100 p-4"
          >
            <CheckCircle2 className="h-12 w-12 lg:h-16 lg:w-16 text-emerald-600" />
          </motion.div>

          {/* Headline */}
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
            Buchung bestätigt!
          </h1>
          <p className="text-slate-500 text-sm lg:text-base mb-8 max-w-xs mx-auto leading-relaxed">
            Vielen Dank. Die Bestätigung wurde an <span className="font-semibold text-slate-700">{email}</span> gesendet.
          </p>

          {/* The "Receipt" Box */}
          <div className="w-full bg-slate-50 rounded-2xl border border-slate-100 p-6 mb-8 text-left space-y-4 relative overflow-hidden">
            {/* Decorative pattern inside receipt (optional) */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <CheckCircle2 className="w-24 h-24 text-slate-900" />
            </div>

            {/* Line Items - JETZT OHNE HAKEN */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 border-dashed">
              <span className="text-sm text-slate-500">Service</span>
              <span className="text-sm font-semibold text-slate-900">{service}</span>
            </div>
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 border-dashed">
              <span className="text-sm text-slate-500">Datum</span>
              <span className="text-sm font-semibold text-slate-900">{date}</span>
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-base font-bold text-slate-700">Gesamt</span>
              <span className="text-xl font-extrabold text-slate-900">{price}€</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-3">
            <Link href="/" className="w-full block">
              <Button className="w-full h-12 bg-slate-900 text-white hover:bg-slate-800 font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl">
                Zurück zur Startseite
              </Button>
            </Link>
            
            <div className="pt-4 border-t border-slate-100 w-full flex justify-center">
              <a href="mailto:felix.kastner27@gmail.com" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-slate-600 transition-colors">
                <Mail className="w-3 h-3" />
                Fragen zur Buchung?
              </a>
            </div>
          </div>

        </div>
      </motion.div>
    </main>
  )
}
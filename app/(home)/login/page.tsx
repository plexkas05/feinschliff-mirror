"use client"

import React from "react"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert("Falsche Daten: " + error.message)
      setLoading(false)
    } else {
      // Login erfolgreich -> Weiter zum Admin Panel
      router.push("/admin")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8 bg-white p-8 rounded-2xl border border-slate-200/60 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 mb-4">
            <Lock className="w-6 h-6 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
          <p className="text-slate-500 text-sm mt-2">Zugriff nur für Teammitglieder</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400"
            />
          </div>
          <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-800" disabled={loading}>
            {loading ? "Prüfe..." : "Einloggen"}
          </Button>
        </form>
      </div>
    </div>
  )
}

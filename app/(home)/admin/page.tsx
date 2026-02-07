"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, DollarSign, LogOut, Trash2, MapPin, Phone } from "lucide-react"

// Typ-Definition für unsere Buchung
type Booking = {
  id: number
  created_at: string
  email: string
  service_name: string
  price: number
  booking_date: string
  status: string
  delivery_option: string
  address?: string
  phone?: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, count: 0 })

  // 1. Check Auth & Load Data
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login") // Nicht eingeloggt? Raus hier!
      } else {
        fetchBookings()
      }
    }
    checkUser()
  }, [router])

  // 2. Daten laden
  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.error('Error:', error)
    else {
      setBookings(data || [])
      // Einfache Statistik berechnen
      const totalMoney = data?.reduce((acc, curr) => acc + Number(curr.price), 0) || 0
      setStats({ total: totalMoney, count: data?.length || 0 })
    }
    setLoading(false)
  }

  // 3. Status ändern (z.B. auf "erledigt")
  const toggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'pending' ? 'done' : 'pending'

    // Optimistic UI Update (Sofort ändern in der Ansicht)
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b))

    await supabase.from('bookings').update({ status: newStatus }).eq('id', id)
  }

  // 4. Löschen
  const deleteBooking = async (id: number) => {
    if (!confirm("Wirklich löschen?")) return

    setBookings(bookings.filter(b => b.id !== id))
    await supabase.from('bookings').delete().eq('id', id)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  if (loading) return <div className="p-10 text-slate-600">Lade Dashboard...</div>

  return (
    <div className="min-h-screen text-slate-900 p-4 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Feinschliff Cockpit</h1>
          <p className="text-slate-500">Willkommen zurück, Chef.</p>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="bg-white border-slate-200/60 text-slate-600 hover:bg-white hover:text-slate-900 transition-colors shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200/60 flex items-center gap-4 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
          <div className="p-3 bg-emerald-50 rounded-full text-emerald-600">
            <DollarSign className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Gesamtumsatz (Theoretisch)</p>
            <p className="text-3xl font-bold text-slate-900">{stats.total} €</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200/60 flex items-center gap-4 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
          <div className="p-3 bg-blue-50 rounded-full text-blue-600">
            <Clock className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-500 text-sm">Offene Aufträge</p>
            <p className="text-3xl font-bold text-slate-900">
              {bookings.filter(b => b.status === 'pending').length}
            </p>
          </div>
        </div>
      </div>

      {/* Die Tabelle */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase font-medium border-b border-slate-200">
              <tr>
                <th className="p-4">Datum</th>
                <th className="p-4">Kunde</th>
                <th className="p-4">Service</th>
                <th className="p-4">Lieferung</th>
                <th className="p-4">Preis</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 whitespace-nowrap text-slate-700">
                    {new Date(booking.booking_date).toLocaleDateString("de-DE")}
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-slate-900">{booking.email}</div>
                    {booking.phone && (
                      <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <Phone className="w-3 h-3" /> {booking.phone}
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-slate-700">
                    <span className="px-2 py-1 bg-slate-100 rounded-md text-xs border border-slate-200">
                      {booking.service_name}
                    </span>
                  </td>
                  <td className="p-4">
                    {booking.delivery_option === 'abholung' ? (
                      <div className="flex flex-col gap-1">
                        <span className="text-amber-600 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> Holen!
                        </span>
                        <span className="text-xs text-slate-400 truncate max-w-37.5" title={booking.address}>
                          {booking.address}
                        </span>
                      </div>
                    ) : (
                      <span className="text-emerald-600 text-xs">Selbstbringer</span>
                    )}
                  </td>
                  <td className="p-4 font-bold text-slate-900">
                    {booking.price} €
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(booking.id, booking.status)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${booking.status === 'done'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                    >
                      {booking.status === 'done' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {booking.status === 'done' ? 'Erledigt' : 'Offen'}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteBooking(booking.id)}
                      className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {bookings.length === 0 && (
            <div className="p-8 text-center text-slate-400">Noch keine Buchungen. Zeit für Werbung!</div>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AgbPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />
      
      {/* Background Ambience (wie auf den anderen Seiten) */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-slate-800/20 rounded-full blur-[100px]" />
         <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[100px]" />
      </div>

      <section className="relative container mx-auto px-6 py-32 max-w-4xl z-10">
        
        {/* Header mit Zurück-Button */}
        <div className="mb-10">
          <Link href="/">
            <Button variant="ghost" className="pl-0 text-slate-400 hover:text-white mb-6 hover:bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück zur Startseite
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <FileText className="w-6 h-6 text-emerald-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Allgemeine Geschäftsbedingungen
            </h1>
          </div>
          
          <p className="text-slate-400 ml-1">
            Das "Kleingedruckte". Fair und transparent.
          </p>
        </div>
        
        {/* Der eigentliche Text-Block (Schön formatiert) */}
        <div className="bg-slate-900/30 backdrop-blur-sm border border-white/5 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="space-y-12 text-slate-300 leading-relaxed">
            
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-lg text-emerald-200 text-sm">
              <span className="font-semibold block mb-1">Stand: Februar 2026</span>
              Diese AGB gelten für alle Aufträge an Feinschliff Graz.
            </div>

            {/* 1. Geltungsbereich */}
            <article>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-slate-600 font-mono">01.</span> Geltungsbereich
              </h3>
              <p>
                Diese Allgemeinen Geschäftsbedingungen gelten für alle Dienstleistungen (insbesondere Messerschleifen), 
                die durch Felix Kastner ("Feinschliff Graz") erbracht werden.
              </p>
            </article>

            {/* 2. Vertragsschluss */}
            <article>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-slate-600 font-mono">02.</span> Vertragsschluss
              </h3>
              <p>
                Die Darstellung der Dienste auf der Website stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar. 
                Durch das Absenden des Buchungsformulars gibst du eine verbindliche Terminanfrage ab. 
                Der Vertrag kommt erst durch unsere Bestätigung (per E-Mail) oder durch die Entgegennahme der Messer zustande.
              </p>
            </article>

            {/* 3. Preise & Bezahlung */}
            <article>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-slate-600 font-mono">03.</span> Preise und Bezahlung
              </h3>
              <p className="mb-4">
                Es gelten die zum Zeitpunkt der Bestellung auf der Website angegebenen Preise.
              </p>
              <div className="pl-4 border-l-2 border-slate-700 my-4 italic text-slate-400">
                Hinweis für Verbraucher: Aufgrund der Kleinunternehmerregelung (in Gründung) wird keine Umsatzsteuer ausgewiesen. 
                Alle angegebenen Preise sind Endpreise.
              </div>
              <p>
                Die Bezahlung erfolgt, sofern nicht anders vereinbart, in bar bei Rückgabe/Lieferung der Messer.
              </p>
            </article>

            {/* 4. Abwicklung & Lieferung */}
            <article>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-slate-600 font-mono">04.</span> Abwicklung
              </h3>
              <ul className="grid gap-3 mt-2">
                <li className="bg-slate-950/50 p-3 rounded border border-white/5">
                  <strong className="text-white">Selbstabgabe:</strong> Die Messer werden vom Kunden zum vereinbarten Termin an die Adresse Rebenweg 12, 8054 Seiersberg gebracht und dort wieder abgeholt.
                </li>
                <li className="bg-slate-950/50 p-3 rounded border border-white/5">
                  <strong className="text-white">Hol- & Bringservice:</strong> Gegen Aufpreis holen wir die Messer im vereinbarten Gebiet ab und liefern sie geschärft zurück.
                </li>
                <li className="bg-slate-950/50 p-3 rounded border border-white/5">
                  <strong className="text-white">Bearbeitungszeit:</strong> Die angegebenen Zeiten (z.B. 72h) sind Richtwerte. Bei Verzögerungen wirst du umgehend informiert.
                </li>
              </ul>
            </article>

            {/* 5. Haftung */}
            <article>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-slate-600 font-mono">05.</span> Haftung & Gewährleistung
              </h3>
              <p className="mb-3">
                Wir behandeln deine Messer mit größter Sorgfalt und nutzen professionelle Nassschleif-Verfahren (Tormek), die den Stahl schonen.
              </p>
              <p>
                Für Schäden, die auf Vorschäden am Material (z.B. versteckte Risse, Rostfras, minderwertiger Stahl) zurückzuführen sind, übernehmen wir keine Haftung. 
                Die Haftung beschränkt sich auf Vorsatz und grobe Fahrlässigkeit, sofern keine Verletzung von Leben, Körper oder Gesundheit vorliegt.
              </p>
            </article>

            {/* 6. Widerrufsrecht */}
            <article>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-slate-600 font-mono">06.</span> Widerrufsrecht
              </h3>
              <p>
                Als Verbraucher hast du grundsätzlich das Recht, binnen 14 Tagen vom Vertrag zurückzutreten. 
                Dieses Recht erlischt jedoch vorzeitig, wenn wir mit deiner ausdrücklichen Zustimmung mit der Dienstleistung (dem Schleifen) begonnen haben 
                und die Dienstleistung vollständig erbracht wurde.
              </p>
            </article>

            {/* 7. Schlussbestimmungen */}
            <article>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="text-slate-600 font-mono">07.</span> Schlussbestimmungen
              </h3>
              <p>
                Es gilt österreichisches Recht. Gerichtsstand ist Graz.
              </p>
            </article>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
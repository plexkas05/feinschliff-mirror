import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AgbPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300">
      <Navbar />
      
      <section className="container mx-auto px-6 py-32 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>
        
        <div className="space-y-8 text-sm md:text-base leading-relaxed">
          
          <div className="p-4 bg-emerald-950/30 border border-emerald-900 rounded-lg text-emerald-200 text-sm mb-8">
            Stand: Februar 2026. Diese AGB gelten für alle Aufträge an Feinschliff Graz.
          </div>

          {/* 1. Geltungsbereich */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">1. Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen gelten für alle Dienstleistungen (insbesondere Messerschleifen), 
              die durch Felix Kastner ("Feinschliff Graz") erbracht werden.
            </p>
          </div>

          {/* 2. Vertragsschluss */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">2. Vertragsschluss</h2>
            <p>
              Die Darstellung der Dienste auf der Website stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar. 
              Durch das Absenden des Buchungsformulars gibst du eine verbindliche Terminanfrage ab. 
              Der Vertrag kommt erst durch unsere Bestätigung (per E-Mail) oder durch die Entgegennahme der Messer zustande.
            </p>
          </div>

          {/* 3. Preise & Bezahlung */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">3. Preise und Bezahlung</h2>
            <p>
              Es gelten die zum Zeitpunkt der Bestellung auf der Website angegebenen Preise.
            </p>
            <p className="mt-2">
              <strong>Hinweis für Verbraucher:</strong> Aufgrund der Kleinunternehmerregelung (in Gründung) wird keine Umsatzsteuer ausgewiesen. 
              Alle angegebenen Preise sind Endpreise.
            </p>
            <p className="mt-2">
              Die Bezahlung erfolgt, sofern nicht anders vereinbart, in bar bei Rückgabe/Lieferung der Messer.
            </p>
          </div>

          {/* 4. Abwicklung & Lieferung */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">4. Abwicklung</h2>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-400">
              <li>
                <strong>Selbstabgabe:</strong> Die Messer werden vom Kunden zum vereinbarten Termin an die Adresse Rebenweg 12, 8054 Seiersberg gebracht und dort wieder abgeholt.
              </li>
              <li>
                <strong>Hol- & Bringservice:</strong> Gegen Aufpreis holen wir die Messer im vereinbarten Gebiet ab und liefern sie geschärft zurück.
              </li>
              <li>
                <strong>Bearbeitungszeit:</strong> Die angegebenen Zeiten (z.B. 72h) sind Richtwerte. Bei Verzögerungen wirst du umgehend informiert.
              </li>
            </ul>
          </div>

          {/* 5. Haftung */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">5. Haftung & Gewährleistung</h2>
            <p>
              Wir behandeln deine Messer mit größter Sorgfalt und nutzen professionelle Nassschleif-Verfahren (Tormek), die den Stahl schonen.
            </p>
            <p className="mt-2">
              Für Schäden, die auf Vorschäden am Material (z.B. versteckte Risse, Rostfras, minderwertiger Stahl) zurückzuführen sind, übernehmen wir keine Haftung. 
              Die Haftung beschränkt sich auf Vorsatz und grobe Fahrlässigkeit, sofern keine Verletzung von Leben, Körper oder Gesundheit vorliegt.
            </p>
            <p className="mt-2">
              Offensichtliche Mängel am Schliff sind unverzüglich bei Übergabe zu reklamieren.
            </p>
          </div>

          {/* 6. Widerrufsrecht */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">6. Widerrufsrecht</h2>
            <p>
              Als Verbraucher hast du grundsätzlich das Recht, binnen 14 Tagen vom Vertrag zurückzutreten. 
              Dieses Recht erlischt jedoch vorzeitig, wenn wir mit deiner ausdrücklichen Zustimmung mit der Dienstleistung (dem Schleifen) begonnen haben 
              und die Dienstleistung vollständig erbracht wurde.
            </p>
          </div>

          {/* 7. Schlussbestimmungen */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">7. Schlussbestimmungen</h2>
            <p>
              Es gilt österreichisches Recht. Gerichtsstand ist Graz.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
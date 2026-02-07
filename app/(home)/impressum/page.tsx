import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ImpressumPage() {
  return (
    <main className="min-h-screen text-slate-600">
      <Navbar />

      <section className="container mx-auto px-6 py-32 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Impressum</h1>

        <div className="space-y-8 text-sm md:text-base leading-relaxed">

          {/* Betreiber */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Medieninhaber & Herausgeber</h2>
            <p className="font-bold text-slate-900">Felix Kastner</p>
            <p>Rebenweg 12</p>
            <p>8054 Seiersberg</p>
            <p>Österreich</p>
          </div>

          {/* Kontakt */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Kontakt</h2>
            <p>Telefon: <a href="tel:+436601628017" className="hover:text-emerald-600 transition-colors">+43 660 1628017</a></p>
            <p>E-Mail: <a href="mailto:felix.kastner27@gmail.com" className="hover:text-emerald-600 transition-colors">felix.kastner27@gmail.com</a></p>
          </div>

          {/* Unternehmensdaten */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Unternehmensdaten</h2>
            <p><strong>Unternehmensgegenstand:</strong> Messerschleifservice</p>
            <p><strong>Rechtsform:</strong> Einzelunternehmer (in Gründung)</p>

            <div className="mt-4 p-4 bg-white border border-slate-200/60 rounded-lg text-slate-500 italic text-sm shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
              Hinweis: Dieses Unternehmen befindet sich aktuell in der Gründungsphase.
              Eine UID-Nummer sowie die Eintragung bei der Wirtschaftskammer erfolgen zeitnah
              mit Aufnahme der regulären Geschäftstätigkeit.
            </div>
          </div>

          {/* Rechtliche Hinweise */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Rechtliche Hinweise</h2>
            <p><strong>Anwendbare Rechtsvorschriften:</strong> Gewerbeordnung (GewO), E-Commerce-Gesetz (ECG)</p>
            <p><strong>Aufsichtsbehörde:</strong> Bezirkshauptmannschaft Graz-Umgebung</p>
            <p><strong>Zugang zu Rechtsvorschriften:</strong> <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 underline decoration-slate-300 underline-offset-4">www.ris.bka.gv.at</a></p>
          </div>

          {/* Mediengesetz */}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Blattlinie</h2>
            <p>Die Website dient der Information über die Dienstleistungen von Feinschliff Graz sowie der Anbahnung von Kundenaufträgen im Bereich Messerschleifen.</p>
          </div>

          {/* Urheberrecht & Haftung */}
          <div className="pt-14 border-t border-slate-200 space-y-9 text-xs text-slate-400">
            <p>
              <strong>Urheberrecht:</strong> Die Inhalte dieser Website sind urheberrechtlich geschützt. Jede Verwendung, die über den privaten Gebrauch hinausgeht, bedarf der schriftlichen Zustimmung.
            </p>
            <p>
              <strong>Haftung für Inhalte:</strong> Wir übernehmen keine Haftung für die Aktualität, Richtigkeit und Vollständigkeit der bereitgestellten Informationen.
            </p>
            <p>
              <strong>Haftung für Links:</strong> Für Inhalte verlinkter externer Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}

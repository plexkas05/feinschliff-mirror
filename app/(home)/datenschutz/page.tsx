import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-300">
      <Navbar />
      
      <section className="container mx-auto px-6 py-32 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">Datenschutzerklärung</h1>
        
        <div className="space-y-8 text-sm md:text-base leading-relaxed">
          
          {/* 1. Einleitung */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">1. Datenschutz auf einen Blick</h2>
            <p>
              Der Schutz deiner persönlichen Daten ist uns sehr wichtig. Diese Datenschutzerklärung informiert dich darüber, 
              welche Daten wir erheben, wie wir sie nutzen und welche Rechte du hast.
            </p>
            <p className="mt-2">
              <strong>Verantwortlicher:</strong><br />
              Felix Kastner<br />
              Rebenweg 12, 8054 Seiersberg<br />
              E-Mail: felix.kastner27@gmail.com
            </p>
          </div>

          {/* 2. Datenerfassung */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">2. Welche Daten wir erfassen</h2>
            <p>Wir verarbeiten Daten, die du uns im Rahmen der Terminbuchung oder Kontaktaufnahme übermittelst:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
              <li>Kontaktdaten (Name, E-Mail-Adresse, Telefonnummer)</li>
              <li>Adressdaten (nur bei Auswahl des Abholservices)</li>
              <li>Auftragsdaten (gewählter Service, Wunschdatum)</li>
              <li>Technische Daten (IP-Adresse, Browser, Zeitpunkt des Zugriffs – automatisch durch unseren Hoster)</li>
            </ul>
          </div>

          {/* 3. Zweck & Rechtsgrundlage */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">3. Wofür wir deine Daten nutzen</h2>
            <p>
              Die Verarbeitung erfolgt auf Basis von <strong>Art. 6 Abs. 1 lit. b DSGVO</strong> (Vertragserfüllung bzw. vorvertragliche Maßnahmen).
              Wir benötigen diese Daten, um:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
              <li>Den Schleifauftrag zu koordinieren und durchzuführen.</li>
              <li>Dich per E-Mail oder Telefon über den Status zu informieren.</li>
              <li>Eine Abholung oder Lieferung durchzuführen.</li>
            </ul>
          </div>

          {/* 4. Weitergabe & Tools */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">4. Hosting & externe Dienste</h2>
            <p>Wir nutzen professionelle Dienstleister, um diesen Service sicher anzubieten:</p>
            
            <div className="mt-4 space-y-4">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <strong className="text-white block mb-1">Vercel Inc. (Hosting)</strong>
                Hosting der Website. Vercel verarbeitet technische Log-Daten (IP-Adressen) zur Sicherheit der Plattform.
              </div>
              
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <strong className="text-white block mb-1">Supabase (Datenbank)</strong>
                Speicherung deiner Buchungsdaten. Die Daten werden verschlüsselt in Rechenzentren gespeichert.
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <strong className="text-white block mb-1">Resend (E-Mail Versand)</strong>
                Wir nutzen Resend für den Versand von Bestätigungsmails. Deine E-Mail-Adresse und der Inhalt der Buchung werden an Resend übermittelt.
              </div>
            </div>
          </div>

          {/* 5. Deine Rechte */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">5. Deine Rechte</h2>
            <p>
              Du hast jederzeit das Recht auf unentgeltliche Auskunft über deine gespeicherten personenbezogenen Daten, 
              deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
            </p>
            <p className="mt-2">
              Kontaktiere uns dazu einfach unter: <a href="mailto:felix.kastner27@gmail.com" className="text-emerald-400 hover:underline">felix.kastner27@gmail.com</a>
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
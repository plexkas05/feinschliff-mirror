import Image from "next/image"; // Wichtig: Das hier importieren
import Link from "next/link"; // WICHTIG: Das hier oben importieren!

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-black text-white">
      
      <h1 className="text-5xl font-bold mb-8">Wilkommen bei keep it sharp</h1>
      
      {/* Das Bild */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-700">
        <Image 
          src="/knife1.jpg"      // Pfad startet direkt im public Ordner
          alt="Ein cooles Hintergrundbild"
          width={800}          // Breite in Pixeln
          height={500}         // Höhe in Pixeln
          priority             // Lädt das Bild sofort (gut für das erste Bild)
        />
      </div>

      {/* Das hier ist der "Button" */}
      <Link 
        href="/testseite" 
        className="bg-green-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
      >
        Test eins
      </Link>

    </main>
  );
}
import Link from "next/link"; // <--- Nicht vergessen!

export default function TestPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-10 bg-zinc-100">
      <h1 className="text-3xl font-bold text-green-600 mb-6">
        Seite 2 funktioniert!
      </h1>
      
      {/* Der Zurück-Button */}
      <Link 
        href="/" 
        className="text-blue-500 hover:underline"
      >
        ← Zurück zur Startseite!
      </Link>
    </div>
  );
}
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CookieBanner } from "@/components/cookie-banner"
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    default: "Feinschliff Graz | Professioneller Messerschleifservice",
    template: "%s | Feinschliff Graz",
  },
  description: "Ihr Experte für scharfe Messer in Seiersberg & Graz. Handgeschliffen auf Tormek-Systemen. Abholservice & Express-Termine verfügbar.",
  keywords: ["Messerschleifen", "Graz", "Seiersberg", "Messer schärfen", "Tormek", "Handwerk", "Schleiferei"],
  authors: [{ name: "Felix Kastner" }],
  openGraph: {
    title: "Feinschliff Graz - Bringt die Schärfe zurück",
    description: "Professioneller Schleifservice in Seiersberg. Jetzt Termin buchen!",
    url: "https://feinschliff-graz.at", // muss ich noch mit domain austauschen 
    siteName: "Feinschliff Graz",
    locale: "de_AT",
    type: "website",
  },
};


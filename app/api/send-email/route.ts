import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    // 1. Daten aus dem Frontend holen
    const body = await request.json();
    const { email, date, service, price, name } = body;

    // 2. Prüfen, ob der API Key da ist (Sicherheits-Check)
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("CRITICAL: RESEND_API_KEY is missing in environment variables!");
      return NextResponse.json(
        { error: 'Server configuration error: Missing Email Key' },
        { status: 500 }
      );
    }

    // 3. Resend erst HIER initialisieren (Verhindert Build-Absturz)
    const resend = new Resend(apiKey);

    // 4. Email senden
    const { data, error } = await resend.emails.send({
      from: 'Feinschliff <onboarding@resend.dev>', // Oder deine verifizierte Domain
      to: [email], // Die Email des Kunden
      subject: `Buchungsbestätigung: ${service}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h1>Danke für deine Buchung, ${name || 'Kunde'}!</h1>
          <p>Wir haben deinen Termin für <strong>${service}</strong> reserviert.</p>
          <hr />
          <p><strong>Datum:</strong> ${date}</p>
          <p><strong>Preis:</strong> ca. ${price}€</p>
          <hr />
          <p>Falls du Fragen hast, antworte einfach auf diese Mail.</p>
          <p>Beste Grüße,<br>Dein Feinschliff-Team</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
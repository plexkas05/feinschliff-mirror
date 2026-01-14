import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, serviceName, date, price, deliveryOption } = await request.json();

    const deliveryText = deliveryOption === "abholung" ? "Hol- & Bringservice" : "Selbstabgabe";

    const { data, error } = await resend.emails.send({
      from: 'Feinschliff <onboarding@resend.dev>', // Solange du keine eigene Domain hast, muss das so bleiben!
      to: [email], // Zum Testen geht das nur an deine EIGENE Email, mit der du dich bei Resend angemeldet hast, bis du eine Domain verifizierst.
      subject: `Buchungsbestätigung: ${serviceName}`,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h1>Danke für deine Buchung!</h1>
          <p>Wir haben deinen Termin reserviert.</p>
          <hr />
          <p><strong>Service:</strong> ${serviceName}</p>
          <p><strong>Datum:</strong> ${date}</p>
          <p><strong>Übergabe:</strong> ${deliveryText}</p>
          <p><strong>Preis:</strong> ${price}€</p>
          <hr />
          <p>Wir melden uns in Kürze für Details zur Übergabe.</p>
          <p>Dein Feinschliff-Team</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
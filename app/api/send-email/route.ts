import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, serviceName, date, price, deliveryOption, address, phone } = await request.json();

    const deliveryText = deliveryOption === "abholung" ? "Hol- & Bringservice" : "Selbstabgabe";

    let nextSteps = "";
    
    // FALL 1: Hol- & Bringservice (Wir rufen Kunden an)
    if (deliveryOption === "abholung") {
      nextSteps = `
        <p style="background-color: #f0fdf4; padding: 10px; border-radius: 5px; border-left: 4px solid #16a34a; color: #166534;">
          <strong>Nächster Schritt:</strong><br>
          Wir rufen dich unter <strong>${phone}</strong> an, um die genaue Abholzeit (ca. +/- 30min) zu vereinbaren.
        </p>
        <p><strong>Abholadresse:</strong> ${address}</p>
      `;
    } 
    // FALL 2: Selbstabgabe (Kunde ruft uns an)
    else {
      nextSteps = `
        <p style="background-color: #f0fdf4; padding: 10px; border-radius: 5px; border-left: 4px solid #16a34a; color: #166534;">
          <strong>Nächster Schritt:</strong><br>
          Bitte ruf uns unter <strong>+43 660 1628017</strong> an, um eine genaue Uhrzeit für die Übergabe zu vereinbaren.
        </p>
        <p><strong>Abgabeadresse:</strong> Rebenweg 12, 8054 Seiersberg</p>
      `;
    }

    const { data, error } = await resend.emails.send({
      from: 'Feinschliff <onboarding@resend.dev>',
      to: [email],
      subject: `Buchung bestätigt: ${serviceName}`,
      html: `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
          <h1>Danke für deine Buchung!</h1>
          <p>Wir haben deinen Termin reserviert.</p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          
          <p><strong>Service:</strong> ${serviceName}</p>
          <p><strong>Datum:</strong> ${date}</p>
          <p><strong>Übergabe:</strong> ${deliveryText}</p>
          <p><strong>Preis:</strong> ${price}€</p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          
          ${nextSteps}
          
          <br>
          <p style="color: #666; font-size: 12px;">Dein Feinschliff-Team</p>
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
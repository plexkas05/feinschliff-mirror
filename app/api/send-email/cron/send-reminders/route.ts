import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Clients initialisieren
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!); // WICHTIG: Service Role Key nutzen!
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  // Sicherheits-Check: Nur Vercel Cron darf das aufrufen
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // 1. Berechne Datum vor 4 Monaten
  const fourMonthsAgo = new Date();
  fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);
  const dateStr = fourMonthsAgo.toISOString(); // Formatierung für DB

  // 2. Hole alle Buchungen, die älter als 4 Monate sind UND noch keine Erinnerung bekommen haben
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('*')
    .lt('created_at', dateStr) // "Less Than" (älter als) 4 Monate
    .eq('reminder_sent', false);

  if (error || !bookings) return NextResponse.json({ error: 'DB Error' });

  // 3. Mails senden
  for (const booking of bookings) { // DOMAIN Updaten nach kauf der Domain, damit die Links in der Mail stimmen
    try {
      await resend.emails.send({
        from: 'Feinschliff <felix.kastner27@gmail.com>',
        to: booking.email,
        subject: 'Eure Messer vermissen ihre Schärfe!',
        html: `
          <h1>Hallo ${booking.name || 'Kunde'}!</h1>
          <p>Dein letzter Schliff ist nun 4 Monate her.</p>
          <p>Wir empfehlen, Messer regelmäßig nachzuschleifen, bevor sie ganz stumpf werden.</p>
          <p><a href="https://feinschliff-graz.at">Hier neuen Termin buchen</a></p> 
          <br>
          <p>Beste Grüße,<br>Felix von Feinschliff</p>
        `
      });

      // 4. In DB markieren: "Erledigt"
      await supabase
        .from('bookings')
        .update({ reminder_sent: true })
        .eq('id', booking.id);

    } catch (e) {
      console.error("Mail failed for", booking.email);
    }
  }

  return NextResponse.json({ success: true, count: bookings.length });
}
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, message } = req.body;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !twilioPhoneNumber) {
    return res.status(500).json({ error: 'Missing Twilio environment variables' });
  }

  try {
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    
    const bodyData = new URLSearchParams({
      To: to,
      From: twilioPhoneNumber,
      Body: message,
    });

    const response = await fetch(twilioUrl, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyData,
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Twilio error' });
    }

    return res.status(200).json({ success: true, sid: data.sid });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
Βήμα 2: Αλλαγή στον κώδικα του frontend (src/app/index.tsx)
Τώρα, αντί να καλείς την Twilio απευθείας, θα καλείς το δικό σου backend API /api/send-sms. Άλλαξε τη συνάρτηση αποστολής στο αρχείο σου σε κάτι τέτοιο:

TypeScript
const handleSimulateScan = async () => {
  const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
  const myPhoneNumber = '+306945291569'; // Ο αριθμός σου

  try {
    const res = await fetch('/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: myPhoneNumber,
        message: `GovClone Verification Code: ${randomCode}`
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log('SMS sent successfully!', data.sid);
      alert('Το SMS στάλθηκε επιτυχώς!');
    } else {
      console.error('Failed to send SMS:', data.error);
      alert('Σφάλμα αποστολής: ' + data.error);
    }
  } catch (err) {
    console.error('Network or server error:', err);
    alert('Προέκυψε σφάλμα σύνδεσης.');
  }
};
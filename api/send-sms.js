export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, message } = req.body;

  try {
    const response = await fetch('https://api.brevo.com/v3/transactionalSMS/sms', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY // Θα βάλεις το κλειδί σου στα Environment Variables του Vercel
      },
      body: JSON.stringify({
        sender: 'GovClone', // Όνομα αποστολέα (μέχρι 11 χαρακτήρες λατινικούς)
        recipient: to,      // Ο αριθμός σου, π.χ. '+3069xxxxxxxx'
        content: message,   // Το μήνυμα που θες να έρθει
        type: 'transactional'
      })
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, data });
    } else {
      return res.status(400).json({ error: data.message || 'Failed to send SMS' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
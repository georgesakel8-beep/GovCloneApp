import twilio from 'twilio';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { phone, code } = req.body;

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  
  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body: `Ο κωδικός ελέγχου εγγράφου gov.gr wallet είναι: ${code}`,
      from: '+306945291569',
      to: phone
    });

    res.status(200).json({ success: true, messageId: message.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
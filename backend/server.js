const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/sos', async (req, res) => {
  const { contacts, location, name } = req.body;

  const message = `URGENT! ${name} needs help! Live location: https://maps.google.com/?q=${location.lat},${location.lng} - Sent via Suraksha App`;

  try {
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': process.env.FAST2SMS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: 'q',
        message: message,
        language: 'english',
        numbers: contacts.join(',')
      })
    });

    const data = await response.json();
    console.log('SMS sent:', data);
    res.json({ success: true, data });

  } catch (error) {
    console.error('SMS error:', error);
    res.json({ success: false, error: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Suraksha backend running!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Suraksha backend running on port ${PORT}`);
});
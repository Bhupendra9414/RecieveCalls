const express = require('express');
const twilio = require('twilio');

const app = express();

app.use(express.urlencoded({ extended: true }));

// Handle incoming call events
app.post('/voice', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const gather = twiml.gather({
    action: '/transcribe',
    method: 'POST',
    speechTimeout: 'auto',
    input: 'speech',
    language: 'en-US',
  });

  gather.say('Please speak after the beep.');

  res.type('text/xml');
  res.send(twiml.toString());
});

app.post('/transcribe', (req, res) => {
  const transcription = req.body.SpeechResult;
  // Process the transcribed text as needed

  res.sendStatus(200);
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

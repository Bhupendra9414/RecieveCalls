const express = require('express');
const twilio = require('twilio');
const serverless = require('serverless-http');
require('dotenv').config();


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

app.get('/', (req, res) => {
  // const transcription = req.body.SpeechResult;
  // Process the transcribed text as needed
  res.send("<h1> Welcome To the App </h1>");
});

app.post('/transcribe', (req, res) => {
  const transcription = req.body.SpeechResult;
  // Process the transcribed text as needed

  res.sendStatus(200);
});

// Export the serverless handler
// module.exports.handler = serverless(app);
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server listening on port 3000');
});
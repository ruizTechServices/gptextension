const express = require('express');
const MistralClient = require('@mistralai/mistralai');
const router = express.Router();

const apiKey = process.env.MISTRAL_API_KEY || 'DVwykfTrlqnAkLnpFmn3ejhg1QoVi8gT';
const client = new MistralClient(apiKey);

router.post('/chatbot', async (req, res) => {
    const {
        userMessage,
        model = 'mistral-large-latest'
    } = req.body;

    if (!userMessage) {
        return res.status(400).send('Missing required field: userMessage');
    }

    try {
        // Call Mistral's chat completion API
        const chatResponse = await client.chat({
            model: model,
            messages: [{ role: 'user', content: userMessage }],
        });

        // Extract and send back the bot's response
        const botMessage = chatResponse.choices[0].message.content;
        res.status(200).json({ botResponse: botMessage });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("I'm sorry, I'm having trouble responding right now.");
    }
});

module.exports = router;
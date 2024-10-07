const express = require('express');
const { Mistral } = require('@mistralai/mistralai'); // Correctly import Mistral class
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();


const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
    throw new Error('Missing MISTRAL_API_KEY environment variable');
}

const client = new Mistral({ apiKey: apiKey }); // Initialize the client instance properly

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
        const chatResponse = await client.chat.complete({
            model: model,
            messages: [{ role: 'user', content: userMessage }],
        });

        // Extract and send back the bot's response
        const botMessage = chatResponse.choices[0]?.message?.content || 'No response';
        res.status(200).json({ botResponse: botMessage });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("I'm sorry, I'm having trouble responding right now.");
    }
});

module.exports = router;
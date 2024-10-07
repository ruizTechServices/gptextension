const express = require('express');
const mistralai = require('@mistralai/mistralai'); // Import the module as an object
const router = express.Router();

const apiKey = process.env.MISTRAL_API_KEY;

if (!apiKey) {
    throw new Error('Missing MISTRAL_API_KEY environment variable');
}

let client;

try {
    client = mistralai(apiKey); // Initialize the client instance
    console.log('Mistral client initialized successfully.');
} catch (initError) {
    console.error('Failed to initialize Mistral client:', initError);
    throw new Error('Mistral client initialization failed.');
}

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
        console.log('Sending request to Mistral API...');
        const chatResponse = await client.chat({
            model: model,
            messages: [{ role: 'user', content: userMessage }],
        });

        // Extract and send back the bot's response
        const botMessage = chatResponse.choices[0]?.message?.content || 'No response';
        res.status(200).json({ botResponse: botMessage });
    } catch (error) {
        console.error('Error while calling Mistral API:', error);
        res.status(500).send("I'm sorry, I'm having trouble responding right now.");
    }
});

module.exports = router;

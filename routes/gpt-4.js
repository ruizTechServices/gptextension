//routes\gpt-4.js
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/chat', async (req, res) => {
    const { message, apiKey, model } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const openaiApiKey = apiKey || process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
        return res.status(400).json({ error: 'API key is required' });
    }

    const openaiModel = model || 'gpt-4';

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`
            },
            body: JSON.stringify({
                model: openaiModel,
                messages: [{ role: 'user', content: message }],
                max_tokens: 450
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const botResponse = data.choices[0].message.content.trim();

        res.json({ response: botResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "I'm sorry, I'm having trouble responding right now." });
    }
});

module.exports = router;

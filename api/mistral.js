const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/chatbot', async (req, res) => {
    const {
        userMessage,
        model = 'mistral-small-latest',
        temperature = 0.7,
        top_p = 1,
        max_tokens = 450,
        min_tokens = 0,
        stream = false,
        stop = null,
        random_seed = null
    } = req.body;

    if (!userMessage) {
        return res.status(400).send('Missing required field: userMessage');
    }

    const apiUrl = 'https://api.mistral.ai/v1/chat/completions'; // Replace with the correct endpoint for Mistral

    try {
        const response = await axios.post(
            apiUrl,
            {
                model: model,
                temperature: temperature,
                top_p: top_p,
                max_tokens: max_tokens,
                min_tokens: min_tokens,
                stream: stream,
                stop: stop,
                random_seed: random_seed,
                messages: [{ role: 'user', content: userMessage }],
                response_format: {
                    type: 'text'
                },
                tool_choice: 'auto',
                safe_prompt: false
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`
                }
            }
        );

        res.json({ botResponse: response.data.choices[0]?.content.trim() });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        res.status(500).send("I'm sorry, I'm having trouble responding right now.");
    }
});

module.exports = router;

//api/gpt-4.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Import embeddings route for combined usage
const embeddingsRouter = require('./embeddings');

router.post('/chatbot', async (req, res) => {
    const { userMessage, model = 'gpt-4', useEmbeddings = false } = req.body;

    if (!userMessage) {
        return res.status(400).send('Missing required field: userMessage');
    }

    try {
        let embeddings = null;

        // If useEmbeddings is true, generate embeddings for the userMessage
        if (useEmbeddings) {
            const embeddingsResponse = await axios.post('https://chrome-24hourgpt-5bb1bcb92d7e.herokuapp.com/embeddings/generate', {
                input: userMessage
            });
            embeddings = embeddingsResponse.data.embeddings;
        }

        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        const response = await axios.post(apiUrl, {
            model: model,
            messages: [{ role: 'user', content: userMessage }],
            max_tokens: 450
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        res.json({ botResponse: response.data.choices[0].message.content.trim(), embeddings: embeddings });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        res.status(500).send("I'm sorry, I'm having trouble responding right now.");
    }
});

module.exports = router;
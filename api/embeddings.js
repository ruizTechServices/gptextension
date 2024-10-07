//api/embeddings.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const openaiApiUrl = 'https://api.openai.com/v1/embeddings';

router.post('/generate', async (req, res) => {
    const { input, model = 'text-embedding-ada-002' } = req.body;

    if (!input) {
        return res.status(400).send('Missing required field: input');
    }

    try {
        const response = await axios.post(openaiApiUrl, {
            model: model,
            input: input,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        res.json({ embeddings: response.data.data[0].embedding });
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        res.status(500).send("I'm sorry, I'm having trouble generating embeddings right now.");
    }
});

module.exports = router;
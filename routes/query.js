//routes\query.js
const express = require('express');
const router = express.Router();
const { generateEmbedding } = require('../services/openai'); // Import OpenAI service
const { saveQueryInSupabase } = require('../services/supabase'); // Import Supabase service

// POST: Handle user query

router.post('/', async (req, res) => {
    const { message } = req.body;

    try {
        // Generate embedding from OpenAI
        const embedding = await generateEmbedding(message);

        // Simulate response (replace with actual response from GPT API)
        const responseMessage = "GPT-4 response here...";

        // Save query, response, and embedding in Supabase
        const savedQuery = await saveQueryInSupabase({
            userId: 'user-id-from-session', // Get user from session or token
            query: message,
            response: responseMessage,
            embedding
        });

        // Send the chatbot response back to the frontend
        res.json({ response: responseMessage });

    } catch (error) {
        console.error('Error processing query:', error);
        res.status(500).json({ error: 'Failed to process the query' });
    }
});

module.exports = router;

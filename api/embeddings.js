// api/embeddings.js
const express = require('express');
const router = express.Router();
const { saveEmbeddingsToRedis, getEmbeddingsFromRedis, saveEmbeddingsToPinecone } = require('../utils/embeddingUtils');

router.post('/embeddings', async (req, res) => {
    const { input, model = 'text-embedding-ada-002', saveEmbeddings = false } = req.body;

    if (!input) {
        return res.status(400).send('Missing required field: input');
    }

    try {
        // Generate embeddings (this would be replaced with actual API call logic)
        const embedding = [0.1, 0.2, 0.3, 0.4]; // Placeholder for actual embedding generation

        if (saveEmbeddings) {
            const key = `embedding:${model}:${input}`;
            // Save to Redis cache first
            await saveEmbeddingsToRedis(key, embedding);

            // Optionally save to Pinecone for long-term storage
            await saveEmbeddingsToPinecone('24hourgpt', key, embedding);
        }

        res.json({ embeddings: embedding });
    } catch (error) {
        console.error('Error generating or saving embeddings:', error);
        res.status(500).send("I'm sorry, I'm having trouble generating embeddings right now.");
    }
});

module.exports = router;

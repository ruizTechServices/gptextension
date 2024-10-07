// utils\embeddingUtils.js
const { redis, pinecone } = require('./redisPineconeClient');

// Function to save embeddings to Redis
async function saveEmbeddingsToRedis(key, embedding) {
    try {
        // Convert embedding array to JSON string to store in Redis
        await redis.set(key, JSON.stringify(embedding), 'EX', 3600); // Set expiry to 1 hour
        console.log('Embeddings saved to Redis successfully');
    } catch (error) {
        console.error('Error saving embeddings to Redis:', error);
    }
}

// Function to retrieve embeddings from Redis
async function getEmbeddingsFromRedis(key) {
    try {
        const embeddingString = await redis.get(key);
        if (embeddingString) {
            return JSON.parse(embeddingString);
        }
        return null;
    } catch (error) {
        console.error('Error retrieving embeddings from Redis:', error);
        return null;
    }
}

// Function to save embeddings to Pinecone
async function saveEmbeddingsToPinecone(indexName, key, embedding) {
    try {
        const index = pinecone.index(indexName);
        await index.upsert([{ id: key, values: embedding }]);
        console.log('Embeddings saved to Pinecone successfully');
    } catch (error) {
        console.error('Error saving embeddings to Pinecone:', error);
    }
}

module.exports = {
    saveEmbeddingsToRedis,
    getEmbeddingsFromRedis,
    saveEmbeddingsToPinecone,
};

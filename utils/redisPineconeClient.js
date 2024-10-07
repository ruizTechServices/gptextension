// redisPineconeClient.js
const Redis = require('ioredis');
const { Pinecone } = require('@pinecone-database/pinecone');

// Load environment variables for Redis and Pinecone credentials
require('dotenv').config();

const redis = new Redis(process.env.REDISCLOUD_URL);
const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

module.exports = { redis, pinecone };

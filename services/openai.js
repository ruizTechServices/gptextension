//services\openai.js
const fetch = require('node-fetch');

// Function to generate embedding from OpenAI
async function generateEmbedding(text) {
    const openAiResponse = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Securely load from .env
        },
        body: JSON.stringify({
            model: 'text-embedding-ada-002',
            input: text
        })
    });

    const data = await openAiResponse.json();
    return data.data[0].embedding; // Return the embedding
}

module.exports = {
    generateEmbedding
};

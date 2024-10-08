// app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Redis = require('ioredis');
const { Pinecone } = require('@pinecone-database/pinecone');
const path = require('path');


// Load environment variables
dotenv.config();

// Initialize Redis and Pinecone clients
const redis = new Redis(process.env.REDISCLOUD_URL);
const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});



// Import routes
const gpt4Routes = require('./api/gpt-4');
const mistralRoutes = require('./api/mistral');
const embeddingsRoutes = require('./api/embeddings');
const supabaseRoutes = require('./api/supabase-api-endpoints');

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/chat', gpt4Routes);
app.use('/mistral', mistralRoutes);
app.use('/embeddings', embeddingsRoutes);
app.use('/supabase', supabaseRoutes);



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});



// 404 Error handler
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});



///this is backend is https://chrome-24hourgpt-5bb1bcb92d7e.herokuapp.com/
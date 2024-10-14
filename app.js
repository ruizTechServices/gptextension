const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const Redis = require('ioredis');
const { Pinecone } = require('@pinecone-database/pinecone');
const path = require('path');


dotenv.config();

const redis = new Redis(process.env.REDISCLOUD_URL);

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});

const gpt4Routes = require('./api/gpt-4');
const mistralRoutes = require('./api/mistral');
const embeddingsRoutes = require('./api/embeddings');
const supabaseRoutes = require('./api/supabase-api-endpoints');
const uploadRoutes = require('./api/upload'); //An endpoint for uploading images to Supabase Storage


const app = express();
const port = process.env.PORT || 3000;
app.use(cors({
    origin: 'http://localhost:5000',
    credentials: true,
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/chat', gpt4Routes);
app.use('/mistral', mistralRoutes);
app.use('/embeddings', embeddingsRoutes);
app.use('/supabase', supabaseRoutes);
app.use('/upload', uploadRoutes); //An endpoint for uploading images to Supabase Storage


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
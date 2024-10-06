const express = require('express');
const app = express();
const dotenv = require('dotenv');
const queryRoutes = require('./routes/query'); // Import the query routes
const userRoutes = require('./routes/user');   // Import user routes

dotenv.config(); // Load environment variables from .env

app.use(express.json());

// Route handlers
app.use('/api/query', queryRoutes); // For handling queries and embeddings
app.use('/api/user', userRoutes);   // For handling user-related requests

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

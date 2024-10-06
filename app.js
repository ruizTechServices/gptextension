const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const gpt4Routes = require('./api/gpt-4');
const mistralRoutes = require('./api/mistral');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/chat', gpt4Routes);
app.use('/mistral', mistralRoutes);

app.get('/', (req, res) => {
    res.send('24HourGPT Backend is running!');
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

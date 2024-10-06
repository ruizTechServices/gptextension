//app.js
const express = require('express');
const dotenv = require('dotenv');
const gpt4Routes = require('./api/gpt-4');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/chat', gpt4Routes);

app.get('/', (req, res) => {
    res.send('24HourGPT Backend is running!');
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
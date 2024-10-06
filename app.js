const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const chatRoutes = require('./chatRoutes');
const modelRoutes = require('./modelRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', chatRoutes);
app.use('/api', modelRoutes);

app.get('/', (req, res) => {
  res.send('24HourGPT Backend is running!');
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
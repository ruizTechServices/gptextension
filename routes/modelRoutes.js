const express = require('express');
const dotenv = require('dotenv');
const chatRoutes = require('./chatRoutes');
const modelRoutes = require('./modelRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', chatRoutes);
app.use('/api', modelRoutes);

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
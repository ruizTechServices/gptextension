const express = require('express');
const app = express();

// Use process.env.PORT if available, otherwise default to 3000 (for local development)
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Simple GET route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Simple POST route
app.post('/data', (req, res) => {
  const data = req.body;
  res.send(`You sent: ${JSON.stringify(data)}`);
});

// 404 route for unmatched paths
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

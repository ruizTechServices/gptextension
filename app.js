const express = require('express');
const app = express();
const port = 3000;
const dataRoutes = require('./routes/dataRoutes');

app.use(express.json());

// Simple GET route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Use the data routes
app.use('/data', dataRoutes);

// 404 route for unmatched paths
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

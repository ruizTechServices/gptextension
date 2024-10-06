const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/data', (req, res) => {
  const data = req.body;
  res.send(`You sent: ${JSON.stringify(data)}`);
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

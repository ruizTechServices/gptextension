//routes\modelRoutes.js
const express = require('express');
const router = express.Router();
const Together = require('together-ai');

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

router.get('/models', async (req, res) => {
  try {
    const models = await together.models.list();
    res.json({ data: models }); // Wrap the models in a 'data' property
  } catch (error) {
    console.error('Error in models route:', error);
    res.status(500).json({ error: 'An error occurred while fetching models' });
  }
});

module.exports = router;
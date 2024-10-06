const express = require('express');
const router = express.Router();
const Together = require('together-ai');

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

router.post('/chat', async (req, res) => {
  try {
    const { messages, model } = req.body;
    
    const stream = await together.chat.completions.create({
      model: model || 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      messages: messages,
      stream: true,
    });

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      res.write(`data: ${JSON.stringify({ content })}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Error in chat route:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

module.exports = router;
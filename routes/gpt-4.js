const axios = require('axios');

router.post('/chat', async (req, res) => {
    const { message, apiKey, model } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const openaiApiKey = apiKey || process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
        return res.status(400).json({ error: 'API key is required' });
    }

    const openaiModel = model || 'gpt-4';

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: openaiModel,
            messages: [{ role: 'user', content: message }],
            max_tokens: 450
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${openaiApiKey}`
            }
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const botResponse = response.data.choices[0].message.content.trim();
        res.json({ response: botResponse });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "I'm sorry, I'm having trouble responding right now." });
    }
});

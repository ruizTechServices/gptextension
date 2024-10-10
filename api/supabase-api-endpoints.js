const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// 1. Save a new query and response
router.post('/query', async (req, res) => {
    const { user_id, query, response, model_used, tokens_used } = req.body;

    const { data, error } = await supabase
        .from('user_queries')
        .insert([
            { user_id, query, response, model_used, tokens_used }
        ])
        .select();

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json(data);
});

// 2. Retrieve past queries for a user
router.get('/queries/:user_id', async (req, res) => {
    const { user_id } = req.params;

    const { data, error } = await supabase
        .from('user_queries')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
});

// 3. Update embedding for a query
router.put('/query/:id/embedding', async (req, res) => {
    const { id } = req.params;
    const { embedding } = req.body;

    const { data, error } = await supabase
        .from('user_queries')
        .update({ embedding })
        .eq('id', id)
        .select();

    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
});

// 4. Search similar queries using embeddings
router.post('/similar-queries', async (req, res) => {
    const { embedding, limit = 5 } = req.body;

    const { data, error } = await supabase.rpc('match_documents', {
        query_embedding: embedding,
        match_threshold: 0.78, // Adjust as needed
        match_count: limit
    });

    if (error) return res.status(400).json({ error: error.message });
    return res.json(data);
});

module.exports = router;
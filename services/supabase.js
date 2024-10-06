const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to save query in Supabase
async function saveQueryInSupabase({ userId, query, response, embedding }) {
    const { data, error } = await supabase
        .from('user_queries') // Referencing the table created in Supabase
        .insert([
            {
                user_id: userId,
                query,
                response,
                embedding, // Store the embedding
                model_used: 'gpt-4', // Or whatever model you used
                tokens_used: 150 // Example token count
            }
        ]);

    if (error) {
        console.error('Error saving query in Supabase:', error);
        throw new Error('Failed to save query in Supabase');
    }

    return data;
}

module.exports = {
    saveQueryInSupabase
};

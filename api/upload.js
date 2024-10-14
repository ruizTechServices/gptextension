const express = require('express');
const multer = require('multer');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const router = express.Router();

// Configure Supabase Client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Configure Multer for image upload handling
const storage = multer.memoryStorage(); // store the image in memory for processing
const upload = multer({ storage: storage });

// Image upload endpoint
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Generate a unique file name using the original name
        const fileName = `${Date.now()}_${req.file.originalname}`;

        // Upload the image to Supabase Storage
        const { data, error } = await supabase.storage
            .from('images') 
            .upload(`${fileName}`, req.file.buffer, {
                cacheControl: '3600', // Set caching rules, e.g., 1 hour
                upsert: false, // Prevent overwriting
                contentType: req.file.mimetype,
            });

        if (error) {
            return res.status(500).json({ error: 'Failed to upload image to Supabase' });
        }

        // Get the public URL of the uploaded image
        const { publicURL } = supabase.storage
            .from('images')
            .getPublicUrl(`${fileName}`);

        // Respond with the CDN URL of the image
        return res.status(200).json({ imageUrl: publicURL });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

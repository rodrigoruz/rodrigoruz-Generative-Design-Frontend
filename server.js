// Import necessary modules
const express = require('express');
const axios = require('axios');

// Create an instance of Express
const app = express();

// Define route to handle incoming requests for the root URL ("/")
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Define route to handle incoming requests from the frontend
app.post('/sendMessage', async (req, res) => {
    const { message } = req.body;
    
    // Send the user's message to the OpenAI API
    const response = await axios.post('https://api.openai.com/v1/completions', {
        prompt: message,
        max_tokens: 50, // Adjust as needed
        temperature: 0.7, // Adjust as needed
        n: 1
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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'
        }
    });
    
    // Send the API response back to the frontend
    res.json(response.data);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

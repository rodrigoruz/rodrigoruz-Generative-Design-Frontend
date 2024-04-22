const express = require("express");
const axios = require("axios");
const path = require("path"); // Import the path module
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' directory

app.post("/api/ask", async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await axios.post("https://api.openai.com/v1/completions", {
            model: "text-davinci-002",
            prompt: prompt,
            max_tokens: 50,
            n: 1,
            stop: ["\n"],
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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",
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while fetching response from OpenAI API." });
    }
});

// Serve the index.html file for all other routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

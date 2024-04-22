const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.json());

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

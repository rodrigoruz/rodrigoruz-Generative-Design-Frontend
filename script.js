document.addEventListener('DOMContentLoaded', function () {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');

    chatForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        const userMessage = userInput.value.trim(); // Get user input

        if (userMessage !== '') {
            displayMessage(userMessage, true); // Display user message in the chat box
            sendMessageToOpenAI(userMessage); // Send user message to OpenAI API
            userInput.value = ''; // Clear input field
        }
    });
});

function displayMessage(message, isUser) {
    const chatBox = document.getElementById('chat-box'); // Move chatBox definition inside displayMessage function
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message');
    messageDiv.textContent = message;
    if (isUser) {
        messageDiv.classList.add('user-message');
    }
    chatBox.appendChild(messageDiv);
}

// Continuing from the previous code snippet

const OPENAI_API_KEY = 'REPLACE';
const OPENAI_API_URL = 'https://api.openai.com/v1/completions';

async function sendMessageToOpenAI(message) {
    const requestBody = {
        prompt: message,
        max_tokens: 50, // Maximum number of tokens in the generated response
        temperature: 0.7, // Sampling temperature (adjust as needed)
        stop: '\n' // Stop generation at newline character
    };

    try {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch response from OpenAI API');
        }

        const responseData = await response.json();
        const aiResponse = responseData.choices[0].text.trim(); // Extract AI-generated response
        displayMessage(aiResponse, false); // Display AI-generated response in the chat box
    } catch (error) {
        console.error('Error:', error);
        displayMessage('Sorry, an error occurred while processing your request.', false);
    }
}

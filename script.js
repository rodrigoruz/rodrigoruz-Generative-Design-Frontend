// Define variables to store references to DOM elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Function to handle sending user message
function sendMessage() {
    // Get user input
    const message = userInput.value;
    
    // Display user message in the chat box
    displayMessage('You', message);

    // Clear the input field
    userInput.value = '';

    // Call function to send message to the backend
    sendMessageToBackend(message);
}

// Function to display messages in the chat box
function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageElement);
}

// Function to send user message to the backend
function sendMessageToBackend(message) {
    // Send message to backend using fetch or Axios
    // Implement this function based on your backend setup
}

// Event listener for send button click
sendBtn.addEventListener('click', sendMessage);

// Event listener for enter key press in the input field
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

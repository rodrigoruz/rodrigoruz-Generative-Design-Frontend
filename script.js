function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    appendMessage("user", userInput);
    document.getElementById("user-input").value = "";

    fetchResponse(userInput);
}

function appendMessage(sender, message) {
    var chatBox = document.getElementById("chat-box");
    var messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function fetchResponse(userInput) {
    fetch("/api/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: userInput,
        }),
    })
    .then(response => response.json())
    .then(data => {
        appendMessage("bot", data.choices[0].text.trim());
    })
    .catch(error => console.error("Error:", error));
}

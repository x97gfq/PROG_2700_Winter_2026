const API_KEY = "YOUR_OPENAI_API_KEY_HERE"; // TODO: Enter your API Key
const history = document.getElementById('chat-history');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Helper function to render messages to the UI
function renderMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role === 'user' ? 'user-message' : 'ai-message'}`;
    msgDiv.textContent = text;
    history.appendChild(msgDiv);
    history.scrollTop = history.scrollHeight;
}

// TODO: Lab 7 Goal - Maintain a conversation history
// logic to load conversation from localstorage should go here (Optional)

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // 1. Render user message
    renderMessage('user', text);
    input.value = '';

    // TODO: Update conversation history with user message

    try {
        // 2. Send request to OpenAI
        // Note: This only sends the *current* message, so the AI has no memory.
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: text }] // <--- PROBLEM: Only sending current message!
            })
        });

        const data = await response.json();
        const aiText = data.choices[0].message.content;

        // 3. Render AI response
        renderMessage('assistant', aiText);

        // TODO: Update conversation history with AI response
        // TODO: (Optional) Save updated history to LocalStorage

    } catch (error) {
        console.error('Error:', error);
        renderMessage('assistant', 'Error fetching response.');
    }
}

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());

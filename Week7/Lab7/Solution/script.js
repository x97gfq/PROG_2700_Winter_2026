const API_KEY = "YOUR_OPENAI_API_KEY"; // TODO: Enter your API Key
const history = document.getElementById('chat-history');
const input = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
let conversationKey = "conversationHistory"; // Local storage key
let conversation = JSON.parse(localStorage.getItem(conversationKey)) || [];

function renderMessage(role, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${role === 'user' ? 'user-message' : 'ai-message'}`;
    msgDiv.textContent = text;
    history.appendChild(msgDiv);
    history.scrollTop = history.scrollHeight;
}

// Render existing history on load
conversation.forEach(msg => renderMessage(msg.role, msg.content));

async function sendMessage() {

    const text = input.value.trim();
    if (!text) return;

    renderMessage('user', text);
    input.value = '';
    conversation.push({ role: 'user', content: text });

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${API_KEY}` },
            body: JSON.stringify({ model: "gpt-3.5-turbo", messages: conversation }) // Send full history
        });

        const data = await response.json();
        const aiText = data.choices[0].message.content;

        renderMessage('assistant', aiText);

        conversation.push({ role: 'assistant', content: aiText });

        localStorage.setItem(conversationKey, JSON.stringify(conversation)); // Update storage

    } catch (error) {
        console.error('Error:', error);
        renderMessage('assistant', 'Error fetching response.');
    }
}

sendBtn.addEventListener('click', sendMessage);
input.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());

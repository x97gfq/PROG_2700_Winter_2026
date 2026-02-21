# Lab 7 - AI Chat Client

This is a simple Vanilla JS chat client that connects to the OpenAI Chat Completions API.

## Setup

1.  Open `script.js`.
2.  Locate the line: `const API_KEY = "YOUR_OPENAI_API_KEY_HERE";`
3.  Replace `"YOUR_OPENAI_API_KEY_HERE"` with your actual OpenAI API Key.
    -   *Note: Do not commit your API key to a public repository.*

## Features

-   **Chat Interface**: Simple and clean UI.
-   **Conversation History**: Maintains conversation context by sending previous messages in the current session.
-   **Persistance**: Saves the conversation to LocalStorage so it persists across page reloads.

## Usage

1.  Open `index.html` in your browser.
2.  Type a message and click "Send".
3.  The AI will respond, remembering the context of the conversation.

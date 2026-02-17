# Lab 7: AI Chat - Conversation Persistence

**Goal:** Transform a "forgetful" AI chat client into one that remembers the conversation.

## Overview
You are provided with a basic chat interface that connects to the OpenAI API. Currently, it only handles **single-turn** interactions. If you tell the AI your name, and then ask "What is my name?", it won't know, because it doesn't remember previous messages.

Your task is to implement **conversation history** using a JavaScript array and **LocalStorage**.

## Instructions
1.  **API Key Setup**:
    *   Open `script.js` and replace `"YOUR_OPENAI_API_KEY_HERE"` with your actual key.
    
2.  **Implement History**:
    *   Create an array to store the conversation messages (objects with `role` and `content`).
    *   *(Optional)* When the page loads, check `LocalStorage` for an existing conversation and render it.

3.  **Update `sendMessage()`**:
    *   When the user sends a message, add it to your history array.
    *   **Crucial Step**: Update the `fetch` call to send the **entire history array** in the `messages` property, not just the current message.
    *   When the AI responds, add its response to the history array.

## Requirements
*   **Context Awareness**: The AI must demonstrate memory of previous messages in the same session.
*   **Code Quality**: Keep your JavaScript under **65 lines** (excluding comments).

## Bonus Challenge (Optional)
*   **Persistence**: Save your history array to `LocalStorage` so the conversation survives a page reload.

## Hints
*   OpenAI expects messages in this format: `[{ role: "user", content: "..." }, { role: "assistant", content: "..." }]`.
*   `JSON.stringify()` and `JSON.parse()` are your friends for LocalStorage.

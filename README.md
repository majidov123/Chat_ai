# Chat AI (React + Vite)

This project is a React-based chat application built using Vite.
It allows users to interact with an AI assistant using a structured chat interface with a sidebar and message panel.

---

## Features

- Sidebar with multiple conversations
- Chat panel with message history
- AI responses using OpenRouter API
- Loading indicator ("AI is typing...")
- Modular component structure (Sidebar, ChatPanel, MessageBubble)
- Mock API for conversations and messages

---

## Project Structure

- `src/components/sidebar` → Sidebar UI
- `src/components/chat` → Chat panel + messages
- `src/api` → Mock API + LLM requests
- `App.jsx` → Main state management

---

## Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Add OpenRouter API Key (IMPORTANT)

Create a file named `.env.local` in the root of the project:

```bash
VITE_OPENROUTER_API_KEY=YOUR_API_KEY_HERE
```

⚠️ Do NOT commit this file to GitHub.

---

### 3. Run the project

```bash
npm run dev
```

Then open:

```
http://localhost:5173
```

---

## Notes

- The API key must remain private and should not be pushed to GitHub.
- The app uses a mock database for conversations and messages.
- AI responses are fetched using OpenRouter.

---

## Bonus Feature

A loading indicator ("AI is typing...") is displayed while waiting for the AI response.

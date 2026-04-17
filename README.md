# Chat AI Application (Assignment 7)

## Overview

This project is a full-stack chat application built with Next.js (App Router) and the Vercel AI SDK.
It allows users to create conversations, send messages, and receive AI-generated responses in real time.

---

## Features

- Create and manage conversations
- Send and receive messages
- AI-powered responses using OpenRouter
- Streaming responses via Vercel AI SDK
- Persistent message storage using Prisma
- Sidebar with conversation list
- Chat UI with user and assistant messages

---

## Tech Stack

- Frontend: Next.js (App Router), React
- Backend: Next.js API Routes
- AI Integration: Vercel AI SDK (`useChat`)
- Model Provider: OpenRouter (GPT-4o-mini)
- Database: Prisma + SQLite
- State Management: React Query

---

## Project Structure

src/
app/
api/
chat/route.ts # AI chat endpoint
conversations/ # conversation + messages API
conversations/[id]/ # chat page
components/
chat/ # chat UI components
sidebar/ # sidebar UI
lib/
messagesApi.ts # frontend API calls
db/ # database logic

---

## How It Works

1. User sends a message from the UI
2. useChat sends request to /api/chat
3. Backend calls OpenRouter API via Vercel AI SDK
4. AI response is streamed back to frontend
5. Messages are stored in the database
6. UI updates in real time

---

## Environment Variables

Create a `.env.local` file in the root directory:

OPENROUTER_API_KEY=your_api_key_here

---

## Installation

npm install

---

## Run the App

npm run dev

Then open:

http://localhost:3000

---

## Known Limitations

- Messages may not immediately appear after refresh due to client-side state hydration
- Input field clearing behavior is basic (UX can be improved)
- No authentication implemented

---

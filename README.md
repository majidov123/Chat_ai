# Assignment 5 – Chat Ai (Next.js)

This project is a continuation of Assignment 4, migrated from a client-side React (Vite) application to a full-stack application using Next.js.

The goal of this assignment was to introduce server-side logic using Next.js API routes and improve the application structure.

## Features

- Sidebar with conversations
- Chat interface with messages
- Dynamic routing for conversations (`/conversations/[id]`)
- Server-side API routes for:
  - fetching conversations
  - fetching messages
  - sending messages
  - AI responses
- Environment variable handling with `.env.local`

## Project Structure

src/
  app/
    page.tsx
    conversations/[id]/page.tsx
    api/
      conversations/route.ts
      conversations/[id]/messages/route.ts
      chat/route.ts

  components/
    sidebar/
      Sidebar.tsx
      ConversationItem.tsx
    chat/
      ChatPanel.tsx
      MessageBubble.tsx
      MessageInputForm.tsx

  lib/
    data.ts

## Getting Started

Install dependencies:

npm install

Run the development server:

npm run dev

Open the app in browser at:

http://localhost:3000

## Environment Variables

Create a `.env.local` file in the root directory and add:

OPENROUTER_API_KEY= api_key_here

This key is used only on the server side and is not exposed to the browser.

## Changes from Assignment 4

- Migrated from Vite + React to Next.js with App Router
- Moved API logic from client-side modules to server-side API routes
- Implemented file-based routing
- Improved component structure with smaller reusable components
- Fixed `useEffect` dependencies to avoid unnecessary re-fetching

## Notes

- Data is stored in-memory in `data.ts`, so it resets when the server restarts
- API routes were tested in the browser and in the Network tab
- `.env.local` is ignored in `.gitignore`

## Production Build

To run the project in production mode:

npm run build
npm run start
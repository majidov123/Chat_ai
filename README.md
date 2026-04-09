# Assignment 6 – Chat AI (Next.js + Prisma)

This project is a continuation of Assignment 5.
The application has been extended with a proper database layer using Prisma, client-side data fetching with TanStack Query, and code quality enforcement via pre-commit hooks.

## Features

- Sidebar with conversations (create & delete)
- Chat interface with persistent messages
- Dynamic routing for conversations (`/conversations/[id]`)
- Server-side API routes for:
  - fetching conversations
  - creating conversations
  - deleting conversations
  - fetching messages
  - sending messages
  - AI responses
- Persistent database using SQLite + Prisma
- Client-side state management using TanStack Query
- Code formatting and linting enforced via pre-commit hooks

## Tech Stack

- Next.js (App Router)
- React
- Prisma ORM
- SQLite (local development)
- TanStack Query
- ESLint + Prettier
- pre-commit (Python hooks)

## Project Structure

src/
app/
page.tsx
layout.tsx
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
providers/
QueryProvider.tsx

lib/
prisma.ts
conversationsApi.ts
messagesApi.ts

prisma/
schema.prisma
migrations/

.pre-commit-config.yaml

## Database (Prisma)

The application now uses Prisma with SQLite.

- Database file: `dev.db` (local only, ignored in git)
- Schema: `prisma/schema.prisma`
- Migrations stored in `prisma/migrations/`

### Run migrations:

npx prisma migrate dev

### Generate Prisma Client:

npx prisma generate

## Getting Started

Install dependencies:

npm install

Run development server:

npm run dev

Open:

http://localhost:3000

## Environment Variables

Create `.env.local`:

OPENROUTER_API_KEY=your_api_key_here
DATABASE_URL="file:./dev.db"

## Pre-commit Hooks

This project uses pre-commit to enforce code quality.

### Install:

pipx install pre-commit
pre-commit install

### Run manually:

pre-commit run --all-files

Hooks include:

- end-of-file fixer
- trailing whitespace removal
- Prettier formatting check
- ESLint

## Changes from Assignment 5

- Replaced in-memory storage (`data.ts`) with Prisma database
- Added persistent conversations and messages
- Introduced TanStack Query for client-side data fetching
- Centralized database access in `lib/`
- Removed client-side data handling logic
- Added pre-commit hooks for formatting and linting
- Improved overall project architecture

## Notes

- `dev.db` is a local database and is not committed
- Data now persists across server restarts
- Prisma migrations ensure reproducibility across environments

## Production Build

npm run build
npm run start

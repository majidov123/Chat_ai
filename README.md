# Chat AI — Full-Stack AI Chat Application

## Overview

Chat AI is a full-stack web application developed using Next.js, React, and TypeScript. It allows users to create conversations, send messages, and receive streamed AI-generated responses through OpenRouter and the Vercel AI SDK.

The project was developed through a series of university coursework assignments, progressing from earlier JavaScript and React implementations to a full-stack application with API routes, persistent database storage, and continuous integration.

**Final implementation:** Assignment 09

## Features

- Create, view, and delete conversations
- Send messages and receive AI-generated responses
- Stream AI responses through the Vercel AI SDK
- Store conversations and messages using PostgreSQL and Prisma
- Navigate conversations using a sidebar
- Responsive chat interface for desktop and mobile
- Progressive Web App (PWA) configuration with offline fallback
- GitHub Actions workflow for automated code-quality checks

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Next.js API Routes |
| AI Integration | Vercel AI SDK, OpenRouter |
| AI Model | GPT-4o-mini via OpenRouter |
| Database | PostgreSQL, Prisma ORM |
| Data Fetching | TanStack React Query |
| CI & Code Quality | GitHub Actions, ESLint, Prettier |
| Deployment | Vercel deployment configuration |
| Development | Node.js, npm, Docker |

## Project Structure

The main application is located in the `src/` directory.

- `src/app/api/chat/` — AI chat API endpoint
- `src/app/api/conversations/` — Conversation management and message endpoints
- `src/app/conversations/[id]/` — Individual conversation pages
- `src/components/chat/` — Chat interface components
- `src/components/sidebar/` — Conversation sidebar and navigation
- `src/components/providers/` — React Query provider
- `src/components/pwa/` — Service worker registration
- `src/lib/` — AI integration, API helpers, and database operations
- `prisma/` — Database schema and migrations
- `.github/workflows/` — Continuous integration workflow
- `public/` — Static assets, PWA manifest, and service worker

### Earlier Coursework Implementations

The repository also includes two separate directories representing earlier development stages:

- `Separated_A3/` — Earlier JavaScript-based chat implementation from Assignment 3
- `Separated_A4/` — React-based chat implementation from Assignment 4

These folders are retained to document the project's development throughout the coursework. The final Next.js application is maintained separately in `src/`.

## Application Architecture

The application follows a full-stack architecture connecting a React frontend, Next.js API routes, an external AI model provider, and a PostgreSQL database.

### AI Chat Workflow

1. The user enters a message in the chat interface.
2. The frontend sends a request to `/api/chat`.
3. The backend processes the request and communicates with OpenRouter using the Vercel AI SDK.
4. The selected model generates an AI response.
5. The response is streamed back to the frontend.
6. User and assistant messages are saved through Prisma in PostgreSQL.

### Conversation Management

Next.js API routes provide operations for:

- Retrieving conversations
- Creating new conversations
- Deleting conversations
- Retrieving messages within a conversation
- Adding messages to existing conversations

TanStack React Query supports frontend data fetching and updates.

## Continuous Integration

The project includes a GitHub Actions CI workflow using Node.js 20.

The workflow performs:

- Dependency installation using `npm ci`
- Automated formatting verification using Prettier
- Static code-quality checks using ESLint

These checks support consistent coding standards and help identify formatting and linting issues during development.

The current CI workflow does not include automated unit tests or API integration tests.

## Installation and Local Setup

### Prerequisites

- Node.js 20 or later
- npm
- PostgreSQL 16 or a compatible PostgreSQL instance
- Docker (optional for local PostgreSQL setup)
- OpenRouter API key

### 1. Clone the Repository

`git clone https://github.com/majidov123/Chat_ai.git`

`cd Chat_ai`

Ensure that the `assignment-09` branch is checked out.

### 2. Install Dependencies

`npm ci`

### 3. Configure Environment Variables

Create a `.env` file in the project root containing:

`DATABASE_URL=postgresql://chat_ai_user:chat_ai_password@localhost:5432/chat_ai?schema=public`

`OPENROUTER_API_KEY=your_openrouter_api_key`

The database credentials above correspond to the example local Docker configuration. Use appropriate credentials for your own database.

Do not commit real API keys or production credentials to GitHub.

### 4. Start PostgreSQL

If using the included Docker Compose configuration:

`docker compose up -d`

Alternatively, connect to an existing PostgreSQL instance.

### 5. Initialize Prisma

Generate the Prisma client:

`npx prisma generate`

Apply the existing database migrations:

`npx prisma migrate deploy`

### 6. Start the Application

`npm run dev`

Open `http://localhost:3000` in your browser.

**Note:** The current homepage redirects to a predefined conversation ID (`c1`). A fresh database does not automatically contain that conversation, so the initial navigation logic may need adjustment before the app works correctly on a clean installation.

## Progressive Web App Support

The project includes a web application manifest, installable-app metadata, mobile icons, and service worker registration.

An offline fallback page is provided for navigation requests when the network is unavailable. AI-generated responses still require network access.

## Known Limitations

- User authentication and conversation ownership are not implemented.
- The current conversation API is not suitable for storing private user conversations in a public deployment without additional access controls.
- The homepage uses a predefined conversation ID that may not exist in a fresh database.
- Previous testing and development checks do not establish complete functional or security test coverage.
- Some client-side state synchronization and input-handling behavior may require further improvement.

## Project Status

This repository documents a university full-stack software development project, culminating in Assignment 09.

The final implementation demonstrates practical experience with frontend development, API integration, database management, AI-powered applications, version control, and continuous integration.

It is an educational project rather than a production-hardened, multi-user AI service.

export type Conversation = {
  id: string;
  title: string;
};

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export const conversationsDb: Conversation[] = [
  { id: "c1", title: "Web App Dev" },
  { id: "c2", title: "Assignment A5" },
  { id: "c3", title: "Random Ideas" },
];

export const messagesDb: Record<string, Message[]> = {
  c1: [
    { id: "m1", role: "assistant", content: "Hi! How can I help you?" },
    { id: "m2", role: "user", content: "Does this app use Next.js now?" },
    { id: "m3", role: "assistant", content: "Yes, this version uses Next.js." },
  ],
  c2: [
    { id: "m4", role: "assistant", content: "Welcome to Assignment 5." },
    { id: "m5", role: "user", content: "What changes in this assignment?" },
    {
      id: "m6",
      role: "assistant",
      content: "You now use Next.js routes and server-side API routes.",
    },
  ],
  c3: [{ id: "m7", role: "assistant", content: "Drop your ideas here." }],
};

export function makeId(): string {
  return Math.random().toString(36).slice(2, 10);
}
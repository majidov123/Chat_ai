const messagesDb = {
  c1: [
    { id: "m1", role: "assistant", content: "Hi! How can I help you?" },
    { id: "m2", role: "user", content: "Does this app use React?" },
    { id: "m3", role: "assistant", content: "Yes — it’s a React app now." },
  ],
  c2: [
    { id: "m4", role: "assistant", content: "Welcome to Assignment 4." },
    { id: "m5", role: "user", content: "What is a mock API?" },
    {
      id: "m6",
      role: "assistant",
      content: "A fake backend implemented in JS.",
    },
  ],
  c3: [{ id: "m7", role: "assistant", content: "Drop your ideas here." }],
};

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export async function listMessages(conversationId) {
  return Promise.resolve([...(messagesDb[conversationId] ?? [])]);
}

export async function createUserMessage(conversationId, content) {
  const msg = { id: makeId(), role: "user", content };
  messagesDb[conversationId] = messagesDb[conversationId] ?? [];
  messagesDb[conversationId].push(msg);
  return Promise.resolve(msg);
}

export async function createAssistantMessage(conversationId, content) {
  const msg = { id: makeId(), role: "assistant", content };
  messagesDb[conversationId] = messagesDb[conversationId] ?? [];
  messagesDb[conversationId].push(msg);
  return Promise.resolve(msg);
}

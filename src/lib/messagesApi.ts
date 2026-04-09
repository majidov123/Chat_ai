export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  conversationId: string;
  createdAt: string;
};

export async function fetchMessages(
  conversationId: string,
): Promise<Message[]> {
  const response = await fetch(`/api/conversations/${conversationId}/messages`);

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  return response.json();
}

export async function createMessage(
  conversationId: string,
  role: string,
  content: string,
): Promise<Message> {
  const response = await fetch(
    `/api/conversations/${conversationId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role, content }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create message");
  }

  return response.json();
}

export async function requestAiReply(
  messages: { role: string; content: string }[],
) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error("Failed to get AI response");
  }

  return response.json() as Promise<{ content: string }>;
}

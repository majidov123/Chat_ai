export type Conversation = {
  id: string;
  title: string;
  createdAt: string;
};

export async function fetchConversations(): Promise<Conversation[]> {
  const response = await fetch("/api/conversations");

  if (!response.ok) {
    throw new Error("Failed to fetch conversations");
  }

  return response.json();
}

export async function createConversation(title: string): Promise<Conversation> {
  const response = await fetch("/api/conversations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    throw new Error("Failed to create conversation");
  }

  return response.json();
}

export async function deleteConversation(
  id: string,
): Promise<{ success: true }> {
  const response = await fetch("/api/conversations", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete conversation");
  }

  return response.json();
}

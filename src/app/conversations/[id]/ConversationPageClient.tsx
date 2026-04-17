"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ChatPanel from "@/components/chat/ChatPanel";
import { fetchMessages } from "@/lib/messagesApi";

type StoredMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatRuntimeProps = {
  conversationId: string;
  initialMessages: {
    id: string;
    role: "user" | "assistant";
    parts: { type: "text"; text: string }[];
  }[];
};

function ConversationChatRuntime({
  conversationId,
  initialMessages,
}: ChatRuntimeProps) {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    messages: initialMessages,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        conversationId,
      },
    }),
  });

  async function handleSend() {
    const trimmed = input.trim();

    if (!trimmed || status === "submitted" || status === "streaming") {
      return;
    }

    setInput("");

    await sendMessage({
      text: trimmed,
    });
  }

  const uiMessages = messages.map((message) => ({
    id: message.id,
    role: message.role as "user" | "assistant",
    content: message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(""),
  }));

  if (error) {
    console.error("Chat error:", error);
  }

  return (
    <ChatPanel
      messages={uiMessages}
      loading={status === "submitted" || status === "streaming"}
      input={input}
      onInputChange={setInput}
      onSend={handleSend}
    />
  );
}

export default function ConversationPageClient() {
  const params = useParams<{ id: string }>();
  const conversationId = params.id;

  const { data: storedMessages = [], isLoading } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => fetchMessages(conversationId),
    enabled: !!conversationId,
  });

  if (isLoading) {
    return (
      <ChatPanel
        messages={[]}
        loading={false}
        input=""
        onInputChange={() => {}}
        onSend={() => {}}
      />
    );
  }

  const initialMessages = storedMessages.map((message: StoredMessage) => ({
    id: message.id,
    role: message.role,
    parts: [
      {
        type: "text" as const,
        text: message.content,
      },
    ],
  }));

  return (
    <ConversationChatRuntime
      key={`${conversationId}-${storedMessages.length}`}
      conversationId={conversationId}
      initialMessages={initialMessages}
    />
  );
}

"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatPanel from "@/components/chat/ChatPanel";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ConversationPageProps = {
  params: Promise<{ id: string }>;
};

export default function ConversationPage({ params }: ConversationPageProps) {
  const [conversationId, setConversationId] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await params;
      setConversationId(resolvedParams.id);
    }

    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!conversationId) return;

    async function fetchMessages() {
      const response = await fetch(
        `/api/conversations/${conversationId}/messages`,
      );
      const data = await response.json();
      setMessages(data);
    }

    fetchMessages();
  }, [conversationId]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading || !conversationId) return;

    setInput("");
    setLoading(true);

    const userResponse = await fetch(
      `/api/conversations/${conversationId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: "user",
          content: text,
        }),
      },
    );

    const userMessage = await userResponse.json();
    setMessages((prev) => [...prev, userMessage]);

    try {
      const historyForLlm = [
        { role: "system", content: "You are a helpful assistant." },
        ...messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
        { role: "user", content: text },
      ];

      const aiResponse = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: historyForLlm,
        }),
      });

      const aiData = await aiResponse.json();

      const assistantResponse = await fetch(
        `/api/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: "assistant",
            content:
              aiData.content ?? `Error: ${aiData.error ?? "Unknown error"}`,
          }),
        },
      );

      const assistantMessage = await assistantResponse.json();
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar activeId={conversationId} />
      <ChatPanel
        messages={messages}
        input={input}
        loading={loading}
        onInputChange={setInput}
        onSend={handleSend}
      />
    </div>
  );
}

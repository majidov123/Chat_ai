"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import ChatPanel from "@/components/chat/ChatPanel";
import {
  createMessage,
  fetchMessages,
  requestAiReply,
} from "@/lib/messagesApi";
import { useState } from "react";

export default function ConversationPage() {
  const params = useParams<{ id: string }>();
  const conversationId = params.id;
  const queryClient = useQueryClient();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: messages = [] } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => fetchMessages(conversationId),
    enabled: !!conversationId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (text: string) => {
      const trimmedText = text.trim();

      if (!trimmedText) {
        throw new Error("Message cannot be empty");
      }

      setLoading(true);

      const userMessage = await createMessage(
        conversationId,
        "user",
        trimmedText,
      );

      const historyForAi = [
        { role: "system", content: "You are a helpful assistant." },
        ...messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
        { role: "user", content: trimmedText },
      ];

      const aiResponse = await requestAiReply(historyForAi);

      const assistantMessage = await createMessage(
        conversationId,
        "assistant",
        aiResponse.content,
      );

      return { userMessage, assistantMessage };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", conversationId] });
      setInput("");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  function handleSend() {
    if (!input.trim() || loading) {
      return;
    }

    sendMessageMutation.mutate(input);
  }

  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar />
      <ChatPanel
        messages={messages}
        loading={loading}
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
      />
    </div>
  );
}

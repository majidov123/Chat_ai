"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import MessageInputForm from "./MessageInputForm";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type ChatPanelProps = {
  messages: Message[];
  input: string;
  loading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
};

export default function ChatPanel({
  messages,
  input,
  loading,
  onInputChange,
  onSend,
}: ChatPanelProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = listRef.current;
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <main className="flex flex-col flex-1 bg-white">
      <div ref={listRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}

        {loading && (
          <div className="text-sm text-gray-500 italic">AI is typing...</div>
        )}
      </div>

      <MessageInputForm
        input={input}
        loading={loading}
        onInputChange={onInputChange}
        onSend={onSend}
      />
    </main>
  );
}
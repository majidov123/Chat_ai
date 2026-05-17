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
    <section className="flex h-full min-h-0 w-full min-w-0 flex-col overflow-hidden bg-white">
      <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-3">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              role={message.role}
              content={message.content}
            />
          ))}

          {loading && (
            <p className="text-sm italic text-slate-500">AI is typing...</p>
          )}
        </div>
      </div>

      <div className="shrink-0 border-t border-slate-200 bg-white p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <MessageInputForm
          input={input}
          loading={loading}
          onInputChange={onInputChange}
          onSend={onSend}
        />
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatPanel({
  messages,
  loading,
  input,
  onInputChange,
  onSend,
}) {
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  return (
    <main className="flex flex-col flex-1 bg-white">
      <div ref={listRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m) => (
          <MessageBubble key={m.id} role={m.role} content={m.content} />
        ))}

        {loading && (
          <div className="text-sm text-gray-500 italic">AI is typing...</div>
        )}
      </div>

      <div className="border-t bg-white p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSend();
          }}
          className="flex gap-2 items-end max-w-3xl mx-auto"
        >
          <textarea
            className="flex-1 resize-none rounded-xl border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
            placeholder="Message AI..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white rounded-xl px-4 py-2 flex-shrink-0 hover:bg-blue-500 disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}

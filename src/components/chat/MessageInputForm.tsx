"use client";

type MessageInputFormProps = {
  input: string;
  loading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
};

export default function MessageInputForm({
  input,
  loading,
  onInputChange,
  onSend,
}: MessageInputFormProps) {
  return (
    <div className="border-t bg-white p-4">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSend();
        }}
        className="flex gap-2 items-end max-w-3xl mx-auto"
      >
        <textarea
          className="flex-1 resize-none rounded-xl border px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={1}
          placeholder="Message AI..."
          value={input}
          onChange={(event) => onInputChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
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
  );
}

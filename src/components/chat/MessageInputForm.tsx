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
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSend();
      }}
      className="mx-auto flex w-full max-w-3xl items-end gap-2"
    >
      <textarea
        value={input}
        rows={1}
        placeholder="Message AI..."
        disabled={loading}
        onChange={(event) => onInputChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSend();
          }
        }}
        className="min-h-11 flex-1 resize-none rounded-xl border border-slate-300 px-4 py-2 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:opacity-50"
      />

      <button
        type="submit"
        disabled={loading}
        className="min-h-11 shrink-0 rounded-xl bg-blue-600 px-4 py-2 text-base font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}

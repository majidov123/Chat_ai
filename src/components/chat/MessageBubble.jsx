export default function MessageBubble({ role, content }) {
  const align = role === "user" ? "justify-end" : "justify-start";
  const bubbleClasses =
    role === "user"
      ? "bg-blue-600 text-white"
      : "bg-gray-100 text-gray-800 border border-gray-200";

  return (
    <div className={`flex ${align}`}>
      <div className={`${bubbleClasses} rounded-2xl px-4 py-2 max-w-[60%]`}>
        {content}
      </div>
    </div>
  );
}

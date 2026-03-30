export default function Sidebar({
  conversations,
  activeId,
  onSelectConversation,
}) {
  return (
    <aside className="hidden md:flex w-64 flex-shrink-0 bg-gray-900 text-white flex-col">
      <div className="p-4 border-b border-gray-700">
        <button
          type="button"
          className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 px-3 py-2 font-semibold"
        >
          + Create a new chat
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {conversations.map((c) => {
          const isActive = c.id === activeId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectConversation(c.id)}
              className={`w-full text-left block px-3 py-2 rounded-lg ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              {c.title}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

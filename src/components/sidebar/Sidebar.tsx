"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConversationItem from "./ConversationItem";

type Conversation = {
  id: string;
  title: string;
};

type SidebarProps = {
  activeId: string;
};

export default function Sidebar({ activeId }: SidebarProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchConversations() {
      const response = await fetch("/api/conversations");
      const data = await response.json();
      setConversations(data);
    }

    fetchConversations();
  }, []);

  function handleSelectConversation(id: string) {
    router.push(`/conversations/${id}`);
  }

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
        {conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            id={conversation.id}
            title={conversation.title}
            isActive={conversation.id === activeId}
            onSelect={handleSelectConversation}
          />
        ))}
      </nav>
    </aside>
  );
}

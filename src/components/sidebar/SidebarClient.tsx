"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import ConversationItem from "./ConversationItem";
import { createConversation, deleteConversation } from "@/lib/conversationsApi";

type Conversation = {
  id: string;
  title: string;
  createdAt: string | Date;
};

type SidebarClientProps = {
  conversations: Conversation[];
};

export default function SidebarClient({ conversations }: SidebarClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createConversation,
    onSuccess: (newConversation) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      router.push(`/conversations/${newConversation.id}`);
      router.refresh();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteConversation,
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });

      if (pathname === `/conversations/${deletedId}`) {
        router.push("/");
      }

      router.refresh();
    },
  });

  function handleCreateConversation() {
    const nextNumber = conversations.length + 1;
    createMutation.mutate(`New Chat ${nextNumber}`);
  }

  function handleDeleteConversation(id: string) {
    deleteMutation.mutate(id);
  }

  return (
    <aside className="w-72 shrink-0 bg-slate-950 text-white flex flex-col border-r border-slate-800">
      <div className="p-4 border-b border-slate-800">
        <button
          onClick={handleCreateConversation}
          disabled={createMutation.isPending}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
        >
          + Create a new chat
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-2">
        {conversations.length === 0 ? (
          <p className="px-3 py-2 text-slate-400">No conversations yet.</p>
        ) : (
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isActive={pathname === `/conversations/${conversation.id}`}
              onClick={() => router.push(`/conversations/${conversation.id}`)}
              onDelete={() => handleDeleteConversation(conversation.id)}
              isDeleting={deleteMutation.isPending}
            />
          ))
        )}
      </nav>
    </aside>
  );
}

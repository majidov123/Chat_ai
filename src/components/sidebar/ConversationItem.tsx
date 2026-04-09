"use client";

import type { Conversation } from "@/lib/conversationsApi";

type ConversationItemProps = {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
  isDeleting: boolean;
};

export default function ConversationItem({
  conversation,
  isActive,
  onClick,
  onDelete,
  isDeleting,
}: ConversationItemProps) {
  return (
    <div
      className={`group flex items-center gap-2 rounded-xl px-3 py-3 cursor-pointer ${
        isActive ? "bg-slate-700" : "hover:bg-slate-800"
      }`}
      onClick={onClick}
    >
      <span className="flex-1 truncate">{conversation.title}</span>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onDelete();
        }}
        disabled={isDeleting}
        className="text-slate-400 hover:text-red-400 disabled:opacity-50"
        aria-label={`Delete ${conversation.title}`}
      >
        ×
      </button>
    </div>
  );
}

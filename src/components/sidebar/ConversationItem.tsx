"use client";

type ConversationItemProps = {
  id: string;
  title: string;
  isActive: boolean;
  onSelect: (id: string) => void;
};

export default function ConversationItem({
  id,
  title,
  isActive,
  onSelect,
}: ConversationItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`w-full text-left block px-3 py-2 rounded-lg ${
        isActive ? "bg-gray-700" : "hover:bg-gray-700"
      }`}
    >
      {title}
    </button>
  );
}

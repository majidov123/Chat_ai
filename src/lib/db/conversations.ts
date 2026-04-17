// src/lib/db/conversations.ts
import { prisma } from "../prisma";

export async function getConversations() {
  return prisma.conversation.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getConversationById(id: string) {
  return prisma.conversation.findUnique({
    where: { id },
  });
}

export async function createConversation(title: string) {
  return prisma.conversation.create({
    data: {
      title,
    },
  });
}

export async function deleteConversation(id: string) {
  return prisma.conversation.delete({
    where: { id },
  });
}

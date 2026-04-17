import { prisma } from "@/lib/prisma";

export async function getMessagesByConversationId(conversationId: string) {
  return prisma.message.findMany({
    where: {
      conversationId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

export async function createMessage(
  conversationId: string,
  role: string,
  content: string,
) {
  return prisma.message.create({
    data: {
      conversationId,
      role,
      content,
    },
  });
}

export async function getConversationForMessages(id: string) {
  return prisma.conversation.findUnique({
    where: {
      id,
    },
  });
}

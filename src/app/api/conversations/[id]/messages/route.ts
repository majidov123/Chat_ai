import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: NextRequest, { params }: Params) {
  const { id } = await params;

  const messages = await prisma.message.findMany({
    where: {
      conversationId: id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json(messages);
}

export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));

  const role = typeof body.role === "string" ? body.role : "";
  const content = typeof body.content === "string" ? body.content.trim() : "";

  if (!role || !content) {
    return NextResponse.json(
      { error: "role and content are required" },
      { status: 400 },
    );
  }

  const conversation = await prisma.conversation.findUnique({
    where: {
      id,
    },
  });

  if (!conversation) {
    return NextResponse.json(
      { error: "conversation not found" },
      { status: 404 },
    );
  }

  const message = await prisma.message.create({
    data: {
      role,
      content,
      conversationId: id,
    },
  });

  return NextResponse.json(message, { status: 201 });
}

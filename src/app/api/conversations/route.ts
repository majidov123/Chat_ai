import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const conversations = await prisma.conversation.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json(conversations);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const title = typeof body.title === "string" ? body.title.trim() : "";

  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const conversation = await prisma.conversation.create({
    data: {
      title,
    },
  });

  return NextResponse.json(conversation, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const id = typeof body.id === "string" ? body.id : "";

  if (!id) {
    return NextResponse.json(
      { error: "conversation id is required" },
      { status: 400 },
    );
  }

  await prisma.conversation.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({ success: true });
}

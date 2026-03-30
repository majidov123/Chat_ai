import { NextRequest, NextResponse } from "next/server";
import { makeId, messagesDb } from "@/lib/data";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: NextRequest, { params }: Params) {
  const { id } = await params;
  return NextResponse.json(messagesDb[id] ?? []);
}

export async function POST(request: NextRequest, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const { role, content } = body;

  if (!role || !content) {
    return NextResponse.json(
      { error: "role and content are required" },
      { status: 400 },
    );
  }

  const newMessage = {
    id: makeId(),
    role,
    content,
  };

  messagesDb[id] = messagesDb[id] ?? [];
  messagesDb[id].push(newMessage);

  return NextResponse.json(newMessage, { status: 201 });
}
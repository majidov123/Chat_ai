import { NextRequest, NextResponse } from "next/server";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "openai/gpt-4o-mini";

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OPENROUTER_API_KEY in .env.local" },
      { status: 500 },
    );
  }

  const body = await request.json();
  const { messages } = body;

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    return NextResponse.json(
      { error: `OpenRouter error ${response.status}: ${errText}` },
      { status: 500 },
    );
  }

  const json = await response.json();
  const content = json?.choices?.[0]?.message?.content ?? "";

  return NextResponse.json({ content });
}

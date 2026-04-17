import { NextRequest } from "next/server";
import { streamText, convertToModelMessages } from "ai";
import { openrouter } from "@/lib/ai";
import { createMessage } from "@/lib/db/messages";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const conversationId =
      typeof body.conversationId === "string" ? body.conversationId : "";

    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (!conversationId) {
      return new Response("conversationId is required", { status: 400 });
    }

    if (!messages.length) {
      return new Response("messages are required", { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];

    if (!lastMessage || lastMessage.role !== "user") {
      return new Response("last message must be a user message", {
        status: 400,
      });
    }

    const userText = Array.isArray(lastMessage.parts)
      ? lastMessage.parts
          .filter((part: { type: string }) => part.type === "text")
          .map((part: { text?: string }) => part.text ?? "")
          .join("")
      : "";

    if (!userText.trim()) {
      return new Response("last user message must contain text", {
        status: 400,
      });
    }

    await createMessage(conversationId, "user", userText);

    const result = streamText({
      model: openrouter("openai/gpt-4o-mini"),
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      onFinish: async ({ responseMessage }) => {
        const text = responseMessage.parts
          .filter((part) => part.type === "text")
          .map((part) => part.text)
          .join("");

        if (text.trim()) {
          await createMessage(conversationId, "assistant", text);
        }
      },
      onError: (error) => {
        console.error("UI stream error:", error);
        return "Failed to connect to OpenRouter";
      },
    });
  } catch (error) {
    console.error("Chat route failed:", error);
    return new Response("Failed to connect to OpenRouter", { status: 500 });
  }
}

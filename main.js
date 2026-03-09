import { OPENROUTER_API_KEY } from "./secrets.js";

import {
  appendUserMessage,
  createAssistantMessage,
  appendAssistantDelta,
} from "./chat.js";
import { streamOpenRouterChat } from "./api.js";

const MODEL = "openai/gpt-4o-mini";

const messageListEl = document.getElementById("messageList");
const chatFormEl = document.getElementById("chatForm");
const messageInputEl = document.getElementById("messageInput");

messageInputEl.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    chatFormEl.requestSubmit();
  }
});

const messages = [{ role: "system", content: "You are a helpful assistant." }];

chatFormEl.addEventListener("submit", async (event) => {
  event.preventDefault();

  const apiKey = OPENROUTER_API_KEY?.trim();
  if (!apiKey) {
    alert("Missing OPENROUTER_API_KEY in secrets.js");
    return;
  }

  const text = messageInputEl.value.trim();
  if (!text) return;

  appendUserMessage(messageListEl, text);

  messages.push({ role: "user", content: text });

  messageInputEl.value = "";
  messageInputEl.focus();

  const assistantBubbleEl = createAssistantMessage(messageListEl);

  try {
    let assistantFull = "";

    assistantFull = await streamOpenRouterChat({
      apiKey,
      model: MODEL,
      messages,
      onDelta: (deltaText) => {
        appendAssistantDelta(assistantBubbleEl, deltaText, messageListEl);
      },
    });

    messages.push({ role: "assistant", content: assistantFull });
  } catch (err) {
    assistantBubbleEl.textContent =
      "Error: " + (err instanceof Error ? err.message : String(err));
  }
});

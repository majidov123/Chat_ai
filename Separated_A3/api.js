const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export async function streamOpenRouterChat({
  apiKey,
  model,
  messages,
  onDelta,
}) {
  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
    }),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    throw new Error(`OpenRouter error ${response.status}: ${errText}`);
  }

  if (!response.body) {
    throw new Error(
      "No response body (streaming not supported in this browser).",
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let fullText = "";
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;
      if (!line.startsWith("data:")) continue;

      const data = line.slice("data:".length).trim();
      if (data === "[DONE]") {
        return fullText;
      }

      try {
        const json = JSON.parse(data);
        const delta = json?.choices?.[0]?.delta?.content;
        if (typeof delta === "string" && delta.length > 0) {
          fullText += delta;
          onDelta(delta);
        }
      } catch (err) {
        if (err instanceof SyntaxError) {
          continue;
        }
        throw err;
      }
    }
  }

  return fullText;
}

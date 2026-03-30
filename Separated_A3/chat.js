class ChatMessage extends HTMLElement {
  connectedCallback() {
    const role = this.getAttribute("role") || "ai";
    const align = role === "user" ? "justify-end" : "justify-start";
    const bubbleClasses =
      role === "user"
        ? "bg-blue-600 text-white"
        : "bg-gray-100 text-gray-800 border border-gray-200";

    this.innerHTML = `
      <div class="flex ${align}">
        <div class="${bubbleClasses} rounded-2xl px-4 py-2 max-w-[60%]">
          ${this.textContent.trim()}
        </div>
      </div>
    `;
  }
}

customElements.define("chat-message", ChatMessage);

function scrollToBottom(messageListEl) {
  messageListEl.scrollTop = messageListEl.scrollHeight;
}

export function appendUserMessage(messageListEl, text) {
  const el = document.createElement("chat-message");
  el.setAttribute("role", "user");
  el.textContent = text;
  messageListEl.appendChild(el);
  scrollToBottom(messageListEl);
}

export function createAssistantMessage(messageListEl) {
  const el = document.createElement("chat-message");
  el.setAttribute("role", "ai");
  el.textContent = "";
  messageListEl.appendChild(el);
  scrollToBottom(messageListEl);

  const bubble = el.querySelector("div > div");
  return bubble ?? el;
}

export function appendAssistantDelta(bubbleEl, deltaText, messageListEl) {
  bubbleEl.textContent += deltaText;
  if (messageListEl) scrollToBottom(messageListEl);
}

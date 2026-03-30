import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import ChatPanel from "./components/chat/ChatPanel";
import { listConversations } from "./api/conversations";
import {
  listMessages,
  createUserMessage,
  createAssistantMessage,
} from "./api/messages";
import { requestCompletion } from "./api/llm";

export default function App() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState("c1");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listConversations().then(setConversations);
  }, []);

  useEffect(() => {
    listMessages(activeId).then(setMessages);
  }, [activeId]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setLoading(true);

    const userMsg = await createUserMessage(activeId, text);
    setMessages((prev) => [...prev, userMsg]);

    try {
      const historyForLlm = [
        { role: "system", content: "You are a helpful assistant." },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: text },
      ];

      const aiText = await requestCompletion(historyForLlm);

      const aiMsg = await createAssistantMessage(activeId, aiText);
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorText =
        err instanceof Error ? err.message : "Unknown error occurred.";
      const aiMsg = await createAssistantMessage(
        activeId,
        `Error: ${errorText}`,
      );
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar
        conversations={conversations}
        activeId={activeId}
        onSelectConversation={setActiveId}
      />
      <ChatPanel
        messages={messages}
        loading={loading}
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
      />
    </div>
  );
}

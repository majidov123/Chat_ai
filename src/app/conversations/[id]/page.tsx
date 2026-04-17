import Sidebar from "@/components/sidebar/Sidebar";
import ConversationPageClient from "./ConversationPageClient";

export default function ConversationPage() {
  return (
    <div className="h-screen flex bg-gray-100">
      <Sidebar />
      <ConversationPageClient />
    </div>
  );
}

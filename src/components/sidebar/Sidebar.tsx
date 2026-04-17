import SidebarClient from "./SidebarClient";
import { getConversations } from "@/lib/db/conversations";

export default async function Sidebar() {
  const conversations = await getConversations();

  return <SidebarClient conversations={conversations} />;
}

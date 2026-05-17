import Sidebar from "@/components/sidebar/Sidebar";
import ConversationPageClient from "./ConversationPageClient";

export default function ConversationPage() {
  return (
    <main className="flex h-dvh w-full overflow-hidden bg-white md:flex-row flex-col">
      <aside className="h-56 w-full shrink-0 overflow-hidden border-b border-slate-800 bg-slate-950 md:h-full md:w-80 md:border-b-0 md:border-r">
        <Sidebar />
      </aside>

      <section className="min-h-0 min-w-0 flex-1 overflow-hidden">
        <ConversationPageClient />
      </section>
    </main>
  );
}

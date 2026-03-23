const conversationsDb = [
  { id: "c1", title: "Web App Dev" },
  { id: "c2", title: "Assignment A4" },
  { id: "c3", title: "Random Ideas" },
];

export async function listConversations() {
  return Promise.resolve([...conversationsDb]);
}

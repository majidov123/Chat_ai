const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const messageList = document.getElementById("messageList");

function addUserMessage(text) {
  const li = document.createElement("li");
  li.className = "message message--user";
  li.textContent = text;
  messageList.appendChild(li);
  li.scrollIntoView({ behavior: "smooth", block: "end" });
}

//Chat part
chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = messageInput.value.trim();
  if (!text) return;

  addUserMessage(text);
  messageInput.value = "";
  messageInput.focus();
});
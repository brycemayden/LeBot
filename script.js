const form = document.getElementById("chat-form");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMsg = input.value;
  appendMessage("You", userMsg);
  input.value = "";

  appendMessage("LeBron", "Hold up, let me break it down like game film...");

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            "You are LeBron James giving confident, inspiring, casual, sports-style advice about Operations Management. Use basketball analogies when possible. Be cool but insightful."
        },
        { role: "user", content: userMsg }
      ]
    })
  });

  const data = await response.json();
  chatBox.lastChild.remove(); // remove loading message
  appendMessage("LeBron", data.choices?.[0]?.message?.content || "Couldn't get an answer, fam.");
});

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.textContent = `${sender}: ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

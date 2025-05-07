form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = input.value;
  appendMessage('You', userMessage);
  input.value = '';

  appendMessage('LeBron', 'Hold up, let me break it down like game film...');

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content:
              'You are LeBron James giving confident, inspiring, casual, sports-style advice about Operations Management. Use basketball analogies when possible. Be cool but insightful.',
          },
          { role: 'user', content: userMessage },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();
    chatBox.lastChild.remove(); // remove loading message
    appendMessage('LeBron', data.choices?.[0]?.message?.content || "Couldn't get an answer, fam.");
  } catch (error) {
    chatBox.lastChild.remove(); // remove loading message
    appendMessage('LeBron', `Error: ${error.message}`);
  }
});

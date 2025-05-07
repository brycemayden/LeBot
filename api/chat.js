export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { messages } = req.body;

  if (!messages) {
    return res.status(400).json({ error: "Missing messages in request" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ error: "No response from OpenAI" });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "OpenAI API request failed." });
  }
}

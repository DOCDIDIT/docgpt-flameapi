const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    // Log incoming request body for debugging
    console.log("Incoming request body:", req.body);

    // Prepare request for OpenAI API
    const body = {
      model: "gpt-4o-mini",
      messages: req.body.messages || []
    };

    // Call OpenAI Chat Completion
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log("OpenAI API Response:", data);

    // Extract the first message from choices (if available)
    if (data.choices && data.choices.length > 0) {
      const message = data.choices[0].message;
      res.status(200).json({ message });
    } else {
      res.status(200).json({ message: "No message returned from Goro." });
    }
  } catch (e) {
    console.error("Error in /api/v1/chat:", e);
    res.status(500).json({ error: e.message });
  }
};

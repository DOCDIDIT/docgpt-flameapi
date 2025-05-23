const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    // Ensure the model param is set in the body
    const body = {
      model: "gpt-4o-mini",   // Add your desired model here
      messages: req.body.messages || [],  // Pass the messages array from the client
      // you can pass other OpenAI parameters here as needed
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

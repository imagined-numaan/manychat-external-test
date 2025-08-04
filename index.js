import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.post("/comment", (req, res) => {
  try {
    let text = undefined;
    if (typeof req.body?.text === "string") {
      text = req.body.text;
    } else if (typeof req.query?.text === "string") {
      text = req.query.text;
    }

    if (typeof text !== "string") {
      return res.status(400).json({
        error: 'Request must provide a "text" field (JSON, form-urlencoded, or query string).',
      });
    }

    const cleanedText = text.trim();
    if (cleanedText.length === 0) {
      return res.status(422).json({
        error: '"text" field must not be empty or whitespace only.',
      });
    }

    const sampleLLMResponse = `Processed input: "${cleanedText}"`;

    console.log("Received comment:", {
      text: cleanedText,
    });

    res.json({
      original: cleanedText,
      sampleLLMResponse,
    });
  } catch (err) {
    console.error("Unexpected error in /comment:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});

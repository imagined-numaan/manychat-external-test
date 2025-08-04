import express from "express";

const app = express();
app.use(express.json());

app.post("/comment", (req, res) => {
  const { text } = req.body;
  console.log(req)
  if (!req.body) return res.status(400).json({error: 'Request body must not be empty.'});
  if (typeof text !== "string") {
    return res
      .status(400)
      .json({ error: 'Request body must have a "text" field of type string.' });
  }
  const sampleLLMResponse = "Some customized response from the LLM."
  res.json({
    original: text,
    sampleLLMResponse,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});

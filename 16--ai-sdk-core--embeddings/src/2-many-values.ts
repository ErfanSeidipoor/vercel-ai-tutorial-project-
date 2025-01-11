import { openai } from "@ai-sdk/openai";
import { embedMany } from "ai";
import { ollama } from "ollama-ai-provider";

(async function () {
  const result = await embedMany({
    // model: openai.embedding("text-embedding-3-small"),
    model: ollama.embedding("mxbai-embed-large"),
    values: [
      "sunny day at the beach",
      "rainy afternoon in the city",
      "snowy night in the mountains",
    ],
  });

  console.log("Result: ", result);
})();

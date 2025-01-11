import { openai } from "@ai-sdk/openai";
import { embed } from "ai";
import { ollama } from "ollama-ai-provider";

(async function () {
  const result = await embed({
    // model: openai.embedding("text-embedding-3-small"),
    model: ollama.embedding("mxbai-embed-large"),
    value: "sunny day at the beach",
  });

  console.log("Result: ", result);
})();

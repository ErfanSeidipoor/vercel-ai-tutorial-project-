import { generateText } from "ai";
import { ollama } from "ollama-ai-provider";

(async function () {
  const response = await generateText({
    model: ollama("llama3.2"),
    prompt: "Invent a new holiday and describe its traditions.",
  });

  console.log(response.text);
})();

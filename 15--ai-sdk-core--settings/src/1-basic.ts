import { generateText } from "ai";
import { ollama } from "ollama-ai-provider";

(async function () {
  const result = await generateText({
    // model: openai("gpt-3.5-turbo"),
    model: ollama("llama3.2"),
    maxTokens: 1000,
    temperature: 0.3,
    maxRetries: 5,
    prompt: "Invent a new holiday and describe its traditions.",
  });

  console.log("Result: ", result.text);
})();

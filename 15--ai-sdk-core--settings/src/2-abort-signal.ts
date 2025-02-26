import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

(async function () {
  const result = await generateText({
    model: openai("gpt-3.5-turbo"),
    // model: ollama("llama3.2"),
    maxTokens: 1000,
    temperature: 0.3,
    maxRetries: 5,
    prompt: "Invent a new holiday and describe its traditions.",
    abortSignal: AbortSignal.timeout(1000),
  });

  console.log("Result: ", result.text);
})();

import { generateText, streamText } from "ai";
import { ollama } from "ollama-ai-provider";

(async function () {
  const result = await streamText({
    model: ollama("llama3.2"),
    prompt: "Invent a new holiday and describe its traditions.",
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }
})();

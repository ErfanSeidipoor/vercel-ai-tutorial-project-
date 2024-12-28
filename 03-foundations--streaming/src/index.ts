import { streamText } from "ai";
import { ollama } from "ollama-ai-provider";

(async function () {
  const { textStream } = streamText({
    model: ollama("llama3.2"),
    prompt: "Write a poem about embedding models.",
  });

  for await (const textPart of textStream) {
    process.stdout.write(textPart);
  }
})();

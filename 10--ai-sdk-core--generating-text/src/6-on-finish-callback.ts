import { streamText } from "ai";
import { ollama } from "ollama-ai-provider";

(async function () {
  const result = await streamText({
    model: ollama("llama3.2"),
    prompt: "Invent a new holiday and describe its traditions.",
    onFinish(args) {
      console.log("\n onFinish > ", args);
    },
  });

  process.stdout.write("\n\n assistant:");
  for await (const message of result.textStream) {
    process.stdout.write(message);
  }
  process.stdout.write("\n\n");
})();

import { streamText } from "ai";
import { ollama } from "ollama-ai-provider";

(async function () {
  const result = await streamText({
    model: ollama("llama3.2"),
    prompt: "Invent a new holiday and describe its traditions.",
    onChunk({ chunk }) {
      console.log("onChunk.type > ", chunk.type);
      // implement your own logic here, e.g.:
      if (chunk.type === "text-delta") {
        console.log(chunk);
      }
    },
  });

  for await (const textStream of result.textStream) {
    console.log("message > ", textStream);
  }
})();

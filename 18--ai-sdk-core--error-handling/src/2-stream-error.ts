import { APICallError, generateText, streamText } from "ai";
import { ollama } from "ollama-ai-provider";

(async function () {
  try {
    const { textStream } = await streamText({
      model: ollama("llama3.2-not-exist"),
      prompt: "Write a vegetarian lasagna recipe for 4 people.",
    });

    for await (const textPart of textStream) {
      process.stdout.write(textPart);
    }
  } catch (error) {
    if (error instanceof APICallError) {
      console.log("API call error", error);
    }
  }
})();

// https://sdk.vercel.ai/docs/reference/ai-sdk-errors

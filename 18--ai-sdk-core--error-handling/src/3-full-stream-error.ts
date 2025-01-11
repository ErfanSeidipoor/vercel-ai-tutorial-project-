import { APICallError, generateText, streamText } from "ai";
import { ollama } from "ollama-ai-provider";

(async function () {
  try {
    const { fullStream } = streamText({
      model: ollama("llama3.2-not-exist"),
      prompt: "Write a vegetarian lasagna recipe for 4 people.",
    });

    for await (const part of fullStream) {
      switch (part.type) {
        case "text-delta": {
          process.stdout.write(part.textDelta);
          break;
        }
        case "error": {
          const error = part.error;
          if (error instanceof APICallError) {
            console.log("1- API call error", error);
          }
          // handle error
          break;
        }
      }
    }
  } catch (error) {
    if (error instanceof APICallError) {
      console.log("2- API call error", error);
    }
  }
})();

// https://sdk.vercel.ai/docs/reference/ai-sdk-errors

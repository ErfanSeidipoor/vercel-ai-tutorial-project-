import { APICallError, generateText } from "ai";
import { ollama } from "ollama-ai-provider";

(async function () {
  try {
    const { text } = await generateText({
      model: ollama("llama3.2-not-exist"),
      prompt: "Write a vegetarian lasagna recipe for 4 people.",
    });

    console.log(text);
  } catch (error) {
    if (error instanceof APICallError) {
      console.log("API call error", error);
    }
  }
})();

// https://sdk.vercel.ai/docs/reference/ai-sdk-errors

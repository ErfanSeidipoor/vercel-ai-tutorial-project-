import { generateText } from "ai";
// import { openai } from "@ai-sdk/openai"
import { ollama } from "ollama-ai-provider";

(async function () {
  const response = await generateText({
    // model: openai("gpt-4-turbo"),
    model: ollama("llama3.2"),
    prompt: "Write a vegetarian lasagna recipe for 4 people.",
  });

  console.log({
    "result.finishReason": await response.finishReason,
    "result.usage": await response.usage,
  });

  console.log(response.text);
})();

import { generateText } from "ai";
// import { openai } from "@ai-sdk/openai"
import { ollama } from "ollama-ai-provider";

(async function () {
  const response = await generateText({
    // model: openai("gpt-4-turbo"),
    model: ollama("llama3.2"),
    prompt: "What is love?",
  });

  console.log({ response });

  console.log(response.text);
})();

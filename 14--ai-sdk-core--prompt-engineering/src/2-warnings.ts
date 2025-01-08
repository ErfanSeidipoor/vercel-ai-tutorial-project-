import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

(async function () {
  const result = await generateText({
    model: openai("gpt-3.5-turbo"),
    prompt: "Hello, world!",
  });

  console.log(result.warnings);
})();

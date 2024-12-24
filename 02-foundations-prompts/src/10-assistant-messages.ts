import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

(async function () {
  const response = await generateText({
    model: openai("gpt-4-turbo"),
    messages: [
      { role: "user", content: "Hi!" },
      { role: "assistant", content: "Hello, how can I help?" },
    ],
  });

  console.log(response.text);
})();

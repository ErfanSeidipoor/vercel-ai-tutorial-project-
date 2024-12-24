import { generateText } from "ai";
import { ollama } from "ollama-ai-provider";

(async function () {
  const response = await generateText({
    model: ollama("llama3.2"),
    messages: [
      { role: "user", content: "Hi!" },
      { role: "assistant", content: "Hello, how can I help?" },
      {
        role: "user",
        content: "Where can I buy the best Currywurst in Berlin?",
      },
    ],
  });

  console.log(response.text);
})();

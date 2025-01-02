import { generateText } from "ai";
import { ollama } from "ollama-ai-provider";

(async function () {
  const response = await generateText({
    model: ollama("llama3.2-vision"),
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe the image in detail." },
          {
            type: "image",
            image:
              "https://raw.githubusercontent.com/vercel/ai/refs/heads/main/examples/ai-core/data/comic-cat.png",
          },
        ],
      },
    ],
  });

  console.log(response.text);
})();

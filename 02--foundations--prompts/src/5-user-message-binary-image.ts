import { generateText } from "ai";
import { ollama } from "ollama-ai-provider";
import * as fs from "node:fs";

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
            image: fs.readFileSync("./comic-cat.png"),
          },
        ],
      },
    ],
  });

  console.log(response.text);
})();

import { generateText } from "ai";
import { ollama } from "ollama-ai-provider";
import { google } from "@ai-sdk/google";
import * as fs from "node:fs";

(async function () {
  const response = await generateText({
    model: google("gemini-1.5-flash"),
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is the audio saying?" },
          {
            type: "file",
            mimeType: "audio/mpeg",
            data: fs.readFileSync("./galileo.mp3"),
          },
        ],
      },
    ],
  });

  console.log(response.text);
})();

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import * as fs from "node:fs";

(async function () {
  const response = await generateText({
    model: google("gemini-1.5-flash"),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "How many calories are in this block of cheese?",
          },
          { type: "image", image: fs.readFileSync("./roquefort.jpg") },
        ],
      },
      {
        role: "assistant",
        content: [
          {
            type: "tool-call",
            toolCallId: "12345",
            toolName: "get-nutrition-data",
            args: { cheese: "Roquefort" },
          },
          // there could be more tool calls here (parallel calling)
        ],
      },
      {
        role: "tool",
        content: [
          {
            type: "tool-result",
            toolCallId: "12345",
            toolName: "get-nutrition-data",
            result: {
              name: "Cheese, roquefort",
              calories: 369,
              fat: 31,
              protein: 22,
            },
            content: [
              {
                type: "text",
                text: "Here is an image of the nutrition data for the cheese:",
              },
              {
                type: "image",
                data: fs.readFileSync("./roquefort.jpg"),
                mimeType: "image/png",
              },
            ],
          },
        ],
      },
    ],
  });

  console.log(response.text);
})();

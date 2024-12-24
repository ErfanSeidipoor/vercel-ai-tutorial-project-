import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import * as fs from "node:fs";

(async function () {
  const response = await generateText({
    model: openai("gpt-4-turbo"),
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
            toolCallId: "12345", // needs to match the tool call id
            toolName: "get-nutrition-data",
            result: {
              name: "Cheese, roquefort",
              calories: 369,
              fat: 31,
              protein: 22,
            },
          },
          // there could be more tool results here (parallel calling)
        ],
      },
    ],
  });

  console.log(response.text);
})();

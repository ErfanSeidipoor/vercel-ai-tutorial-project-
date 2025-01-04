import { streamText } from "ai";
import { z } from "zod";
import { ollama } from "ollama-ai-provider";
import { openai } from "@ai-sdk/openai";

(async function () {
  const result = await streamText({
    // model: ollama("llama3.2"),
    model: openai("gpt-3.5-turbo"),
    tools: {
      cityAttractions: {
        parameters: z.object({
          city: z.string(),
        }),
        execute: async ({ city }) => {
          return {
            attractions: ["attraction1", "attraction2", "attraction3"],
          };
        },
      },
    },
    prompt: "What are some San Francisco tourist attractions?",
  });

  for await (const part of result.fullStream) {
    console.log("part > ", part);
    switch (part.type) {
      case "text-delta":
        process.stdout.write(part.textDelta);
        break;
      case "tool-call": {
        switch (part.toolName) {
          case "cityAttractions":
            // handle toolCall here
            break;
          default:
            break;
        }
        break;
      }
      case "tool-result": {
        switch (part.toolName) {
          case "cityAttractions":
            // handle toolResult here
            break;
          default:
            break;
        }
        break;
      }
      case "finish":
        // handle finish here
        break;
      case "error":
        // handle error here
        break;
      default:
        break;
    }
  }
})();

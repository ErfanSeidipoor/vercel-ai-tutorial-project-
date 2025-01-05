import { openai } from "@ai-sdk/openai";
import { CoreMessage, generateText } from "ai";
import { ollama } from "ollama-ai-provider";
import { z } from "zod";

(async function () {
  const response = await generateText({
    // model: ollama("llama3.2"),
    model: openai("gpt-3.5-turbo"),
    prompt: "What is the weather in San Francisco?",
    maxSteps: 10,
    tools: {
      weather: {
        description: "Get the weather in a location ?",
        parameters: z.object({
          location: z.string().describe("the location to get the weather for"),
        }),
        execute: async (
          { location },
          { toolCallId, messages, abortSignal }
        ) => {
          console.dir({ toolCallId, messages, abortSignal }, { depth: null });

          return fetch(
            `https://api.weatherapi.com/v1/current.json?q=${location}`,
            { signal: abortSignal } // forward the abort signal to fetch
          );
        },
      },
    },
  });

  const { text, toolCalls, toolResults } = response;
  console.dir({ text, toolCalls, toolResults });
})();

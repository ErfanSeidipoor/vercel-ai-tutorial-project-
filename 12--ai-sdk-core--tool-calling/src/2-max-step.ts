import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { ollama } from "ollama-ai-provider";
import { z } from "zod";

(async function () {
  const response = await generateText({
    model: ollama("llama3.2"),
    // model: openai("gpt-3.5-turbo"),
    prompt: "What is the weather in San Francisco?",
    maxSteps: 10, // You may want the model to generate text after the tool has been executed, either to summarize the tool results in the context of the users query
    tools: {
      weather: {
        description: "Get the weather in a location ?",
        parameters: z.object({
          location: z.string().describe("the location to get the weather for"),
        }),
        execute: async ({ location }) => ({
          location,
          temperature: 72 + Math.floor(Math.random() * 21) - 10,
        }),
      },
    },
  });

  const { text, toolCalls, toolResults, steps } = response;

  console.dir({ text, toolCalls, toolResults }, { depth: null });

  for (let index = 0; index < steps.length; index++) {
    console.log(">>>>> ", index + 1);
    console.dir(steps[index], { depth: null });
  }
})();

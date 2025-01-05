import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { ollama } from "ollama-ai-provider";
import { z } from "zod";

(async function () {
  const response = await generateText({
    // model: ollama("llama3.2"),
    model: openai("gpt-3.5-turbo"),
    prompt: "What is the weather in San Francisco?",
    toolChoice: "required",
    // auto (default): the model can choose whether and which tools to call.
    // required: the model must call a tool. It can choose which tool to call.
    // none: the model must not call tools
    maxSteps: 10,
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

  const { text, toolCalls, toolResults } = response;
  console.dir({ text, toolCalls, toolResults });
})();

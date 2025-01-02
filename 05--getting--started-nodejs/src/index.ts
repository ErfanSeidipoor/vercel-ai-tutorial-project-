import { openai } from "@ai-sdk/openai";
import { ollama } from "ollama-ai-provider";
import { CoreMessage, streamText, tool } from "ai";
import * as readline from "node:readline/promises";
import { z } from "zod";

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages: CoreMessage[] = [];

(async function () {
  while (true) {
    const userInput = await terminal.question("You: ");
    messages.push({ role: "user", content: userInput });

    // console.dir({ messages }, { depth: null });

    const result = await streamText({
      // model: ollama("llama3.2"),
      model: openai("gpt-3.5-turbo"),
      messages,
      tools: {
        weather: tool({
          description: "Get the weather in a location (in Celsius)",
          parameters: z.object({
            location: z
              .string()
              .describe("The location to get the weather for"),
          }),
          execute: async ({ location }) => ({
            location,
            temperature: Math.round((Math.random() * 30 + 5) * 10) / 10, // Random temp between 5°C and 35°C
          }),
        }),
        convertCelsiusToFahrenheit: tool({
          description: "Convert a temperature from Celsius to Fahrenheit",
          parameters: z.object({
            celsius: z
              .number()
              .describe("The temperature in Celsius to convert"),
          }),
          execute: async ({ celsius }) => {
            const fahrenheit = (celsius * 9) / 5 + 32;
            return { fahrenheit: Math.round(fahrenheit * 100) / 100 };
          },
        }),
      },
      maxSteps: 5,
      onStepFinish: (step) => {
        console.log("onStepFinish > ");
        const { finishReason, toolCalls, text } = step;
        console.dir({ finishReason, toolCalls, text }, { depth: null });
      },
    });

    let fullResponse = "";
    process.stdout.write("\n\n assistant:");
    for await (const message of result.textStream) {
      fullResponse += message;
      process.stdout.write(message);
    }
    process.stdout.write("\n\n");

    console.log(await result.toolCalls);
    console.log(await result.toolResults);
    messages.push({ role: "assistant", content: fullResponse });
  }
})();

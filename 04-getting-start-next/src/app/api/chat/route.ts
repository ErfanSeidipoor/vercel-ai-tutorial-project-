import { streamText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
// import { ollama } from "ollama-ai-provider";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log({ messages });

  const result = streamText({
    model: openai("gpt-3.5-turbo"),
    // model: ollama("llama3.2"),
    messages,
    tools: {
      weather: tool({
        description: "Get the weather in a location (fahrenheit)",
        parameters: z.object({
          location: z.string().describe("the location to get the weather for"),
        }),
        execute: async ({ location }) => {
          const temperature = Math.round(Math.random() * (90 - 32) + 32);

          return {
            text: `The weather in ${location} is ${temperature}°F`,
          };
        },
      }),
      convertFahrenheitToCelsius: tool({
        description: "Convert a temperature in fahrenheit to celsius",
        parameters: z.object({
          temperature: z
            .number()
            .describe("The temperature in fahrenheit to convert"),
          location: z.string().describe("the location to get the weather for"),
        }),
        execute: async ({ temperature, location }) => {
          const celsius = Math.round((temperature - 32) * (5 / 9));
          return `The weather in ${location} is ${celsius}°C`;
        },
      }),
    },
  });

  console.log({ result });

  return result.toDataStreamResponse();
}

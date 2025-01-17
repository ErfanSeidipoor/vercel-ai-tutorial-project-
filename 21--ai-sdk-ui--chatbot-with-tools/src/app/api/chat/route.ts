import { ollama } from "ollama-ai-provider";
import { streamText } from "ai";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.dir({ messages }, { depth: null });

  const systemMessage = [
    { role: "system", content: "You are a weather assistant " },
  ];

  const result = streamText({
    maxSteps: 5,
    experimental_toolCallStreaming: true,

    model: openai("gpt-4-turbo"),
    // model: ollama("llama3.2"),
    messages: [...systemMessage, ...messages],
    tools: {
      // server-side tool with execute function:
      getWeatherInformation: {
        description: "show the weather in a given city to the user",
        parameters: z.object({ city: z.string() }),
        execute: async ({}: { city: string }) => {
          const weatherOptions = ["sunny", "cloudy", "rainy", "snowy", "windy"];
          return weatherOptions[
            Math.floor(Math.random() * weatherOptions.length)
          ];
        },
      },
      // client-side tool that starts user interaction:
      askForConfirmation: {
        description: "Ask the user for confirmation.",
        parameters: z.object({
          message: z.string().describe("The message to ask for confirmation."),
        }),
      },
      // client-side tool that is automatically executed on the client:
      getLocation: {
        description:
          "Get the user location. Always ask for confirmation before using this tool.",
        parameters: z.object({}),
      },
    },
  });

  // console.log({ result });

  return result.toDataStreamResponse({
    getErrorMessage: (error: unknown) => {
      console.log({ error });

      if (error == null) {
        return "unknown error";
      }

      if (typeof error === "string") {
        return error;
      }

      if (error instanceof Error) {
        return error.message;
      }

      return JSON.stringify(error);
    },
  });
}

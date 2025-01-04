import {
  generateObject,
  generateText,
  NoObjectGeneratedError,
  Output,
  streamText,
} from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { ollama } from "ollama-ai-provider";

(async function () {
  const { experimental_partialOutputStream } = await streamText({
    model: ollama("llama3.2"),
    experimental_output: Output.object({
      schema: z.object({
        name: z.string(),
        age: z.number().nullable().describe("Age of the person."),
        contact: z.object({
          type: z.literal("email"),
          value: z.string(),
        }),
        occupation: z.object({
          type: z.literal("employed"),
          company: z.string(),
          position: z.string(),
        }),
      }),
    }),
    prompt: "Generate an example person for testing.",
  });

  for await (const part of experimental_partialOutputStream) {
    console.log("part > ", part);
  }
})();

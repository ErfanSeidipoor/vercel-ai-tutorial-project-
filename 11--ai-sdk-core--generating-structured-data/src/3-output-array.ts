import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { ollama } from "ollama-ai-provider";
import { z } from "zod";

(async function () {
  const { elementStream } = await streamObject({
    // model: ollama("llama3.2"),
    model: openai("gpt-4o"),
    output: "array",
    schema: z.object({
      name: z.string(),
      class: z
        .string()
        .describe("Character class, e.g. warrior, mage, or thief."),
      description: z.string(),
    }),
    prompt: "Generate 3 hero descriptions for a fantasy role playing game.",
  });

  for await (const hero of elementStream) {
    console.log("hero > ", hero);
  }
})();

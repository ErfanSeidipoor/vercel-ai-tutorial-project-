import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { ollama } from "ollama-ai-provider";
import { z } from "zod";

(async function () {
  const { partialObjectStream } = await streamObject({
    // model: ollama("llama3.2"),
    model: openai("gpt-4o"),
    schema: z.object({
      recipe: z.object({
        name: z.string(),
        ingredients: z.array(
          z.object({ name: z.string(), amount: z.string() })
        ),
        steps: z.array(z.string()),
      }),
    }),
    prompt: "Generate a lasagna recipe.",
  });

  for await (const part of partialObjectStream) {
    console.log("part > ", part);
  }
})();

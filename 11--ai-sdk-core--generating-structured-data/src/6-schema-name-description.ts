import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { ollama } from "ollama-ai-provider";
import { z } from "zod";

(async function () {
  const { object } = await generateObject({
    // model: ollama("llama3.2"),
    model: openai("gpt-3.5-turbo"),
    schemaName: "Recipe",
    schemaDescription: "A recipe for a dish.",
    schema: z.object({
      name: z.string(),
      ingredients: z.array(z.object({ name: z.string(), amount: z.string() })),
      steps: z.array(z.string()),
    }),
    prompt: "Generate a lasagna recipe.",
  });

  console.dir(object, { depth: null });
})();

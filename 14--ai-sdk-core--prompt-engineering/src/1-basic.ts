import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { ollama } from "ollama-ai-provider";
import { z } from "zod";

(async function () {
  const result = await generateObject({
    model: openai("gpt-3.5-turbo"),
    // model: ollama("llama3.2"),
    schema: z.object({
      events: z.array(
        z.object({
          event: z.string(),
          date: z
            .string()
            .date()
            .transform((value) => new Date(value)),
        })
      ),
    }),
    prompt: "List 5 important events from the the year 2000.",
  });

  console.log("Result: ", result.object);
})();

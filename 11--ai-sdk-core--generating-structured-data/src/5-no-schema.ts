import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { ollama } from "ollama-ai-provider";
import { z } from "zod";

(async function () {
  const { object } = await generateObject({
    // model: ollama("llama3.2"),
    model: openai("gpt-4o"),
    output: "no-schema",
    prompt: "Generate a lasagna recipe.",
  });

  console.dir(object, { depth: null });
})();

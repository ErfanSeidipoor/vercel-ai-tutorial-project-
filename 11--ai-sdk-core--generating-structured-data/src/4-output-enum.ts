import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { ollama } from "ollama-ai-provider";
import { z } from "zod";

(async function () {
  const { object } = await generateObject({
    // model: ollama("llama3.2"),
    model: openai("gpt-4o"),
    output: "enum",
    enum: ["action", "comedy", "drama", "horror", "sci-fi"],
    prompt:
      "Classify the genre of this movie plot: " +
      '"A group of astronauts travel through a wormhole in search of a ' +
      'new habitable planet for humanity."',
  });

  console.log({ object });
})();

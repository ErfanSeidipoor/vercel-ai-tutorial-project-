import { smoothStream, streamText } from "ai";
import { z } from "zod";
import { ollama } from "ollama-ai-provider";
import { openai } from "@ai-sdk/openai";

(async function () {
  console.log(smoothStream());

  const result = await streamText({
    // model: ollama("llama3.2"),
    model: openai("gpt-3.5-turbo"),
    experimental_transform: smoothStream(),
    prompt: "What are some San Francisco tourist attractions?",
  });

  for await (const part of result.textStream) {
    console.log("part > ", part);
  }
})();

import { generateText, smoothStream, streamText } from "ai";
import { z } from "zod";
import { ollama } from "ollama-ai-provider";
import { openai } from "@ai-sdk/openai";

(async function () {
  const {
    text, // combined text
    usage, // combined usage of all steps
  } = await generateText({
    model: ollama("llama3.2"),
    // model: openai("gpt-3.5-turbo"),
    maxSteps: 5, // enable multi-step calls
    experimental_continueSteps: true,
    prompt:
      "Write a book about Roman history, " +
      "from the founding of the city of Rome " +
      "to the fall of the Western Roman Empire. " +
      "Each chapter MUST HAVE at least 1000 words.",
  });

  console.log({ text, usage });
})();

import { ollama } from "ollama-ai-provider";
import { tool, generateText } from "ai";
import * as mathjs from "mathjs";
import { z } from "zod";
import { openai } from "@ai-sdk/openai";

(async function () {
  const response = await generateText({
    // model: ollama("llama3.2"),
    model: openai("gpt-3.5-turbo"),
    maxSteps: 10,
    system:
      "You are solving math problems. " +
      "Reason step by step. " +
      "Use the calculator when necessary. " +
      "When you give the final answer, " +
      "provide an explanation for how you arrived at it.",
    prompt:
      "A taxi driver earns $9461 per 1-hour of work. " +
      "If he works 12 hours a day and in 1 hour " +
      "he uses 12 liters of petrol with a price  of $134 for 1 liter. " +
      "How much money does he earn in one day?",
    tools: {
      calculation: tool({
        description:
          "A tool for evaluating mathematical expressions. " +
          "Example expressions: " +
          "'1.2 * (2 + 4.5)', '12.7 cm to inch', 'sin(45 deg) ^ 2'.",
        parameters: z.object({ expression: z.string() }),
        execute: async ({ expression }) => {
          console.log("expression: ", expression);

          return {
            expression,
            result: mathjs.evaluate(expression),
          };
        },
      }),
    },
  });

  console.log("Answer: ", response.text);
})();

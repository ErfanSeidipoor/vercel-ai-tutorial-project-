import {
  generateText,
  InvalidToolArgumentsError,
  NoSuchToolError,
  tool,
  ToolExecutionError,
} from "ai";
import { ollama } from "ollama-ai-provider";
import { z } from "zod";

(async function () {
  try {
    const result = await generateText({
      model: ollama("llama3.2"),
      prompt: "Im 33, display my age in minutes?",
      maxSteps: 10,
      tools: {
        display_age_in_minutes: tool({
          description: "Display the age in minutes",
          parameters: z.object({
            age: z.number().describe("the age of the user"),
          }),
          execute: async ({ age }) => {
            if (age < 0) {
              throw new InvalidToolArgumentsError({
                message: "Age cannot be negative",
                toolArgs: JSON.stringify({ age }),
                toolName: "display_age_in_minutes",
                cause: undefined,
              });
            }
            return { ageInMinutes: age * 365 * 24 * 60 };
          },
        }),
      },
    });
    console.log(result.text);
  } catch (error) {
    if (NoSuchToolError.isInstance(error)) {
      console.log(">>>> NoSuchToolError", { error });
      // handle the no such tool error
    } else if (InvalidToolArgumentsError.isInstance(error)) {
      console.log(">>>> InvalidToolArgumentsError", { error });
      // handle the invalid tool arguments error
    } else if (ToolExecutionError.isInstance(error)) {
      console.log(">>>> ToolExecutionError", { error });
      // handle the tool execution error
    } else {
      // handle other errors
    }
  }
})();

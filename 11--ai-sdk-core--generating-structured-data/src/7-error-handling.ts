import { generateObject, NoObjectGeneratedError } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { ollama } from "ollama-ai-provider";

(async function () {
  try {
    const { object } = await generateObject({
      model: ollama("llama3.2"),
      schema: z.object({
        name: z.string(),
        ingredients: z.array(
          z.object({ name: z.string(), amount: z.string() })
        ),
        steps: z.array(z.string()),
      }),
      prompt: "Generate a lasagna recipe.",
    });
    console.dir(object, { depth: null });
  } catch (error) {
    if (NoObjectGeneratedError.isInstance(error)) {
      console.log("NoObjectGeneratedError");
      console.log("Cause:", error.cause);
      console.log("Text:", error.text);
      console.log("Response:", error.response);
      console.log("Usage:", error.usage);
    } else if (error instanceof Error) {
      console.log("Error:", error.message);
      console.log("name:", error.name);
    } else {
      console.log("Unknown error:", error);
    }
  }
})();

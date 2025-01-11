import { generateObject, generateText } from "ai";
import { MockLanguageModelV1 } from "ai/test";
import { ollama } from "ollama-ai-provider";
import { z } from "zod";

(async function () {
  const { object } = await generateObject({
    model: new MockLanguageModelV1({
      defaultObjectGenerationMode: "json",
      doGenerate: async () => ({
        rawCall: { rawPrompt: null, rawSettings: {} },
        finishReason: "stop",
        usage: { promptTokens: 10, completionTokens: 20 },
        text: `{"content":"Hello, world!"}`,
      }),
    }),
    schema: z.object({ content: z.string() }),
    prompt: "Write a vegetarian lasagna recipe for 4 people.",
  });

  console.log(object);
})();

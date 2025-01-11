import { generateText } from "ai";
import { MockLanguageModelV1 } from "ai/test";
import { ollama } from "ollama-ai-provider";

(async function () {
  const { text } = await generateText({
    model: new MockLanguageModelV1({
      doGenerate: async () => ({
        rawCall: { rawPrompt: null, rawSettings: {} },
        finishReason: "stop",
        usage: { promptTokens: 10, completionTokens: 20 },
        text: `Hello, world!`,
      }),
    }),
    prompt: "Write a vegetarian lasagna recipe for 4 people.",
  });

  console.log(text);
})();

import { streamText } from "ai";
import { MockLanguageModelV1, simulateReadableStream } from "ai/test";
import { ollama } from "ollama-ai-provider";

(async function () {
  const { textStream } = await streamText({
    model: new MockLanguageModelV1({
      doStream: async () => ({
        rawCall: { rawPrompt: null, rawSettings: {} },
        stream: simulateReadableStream({
          chunks: [
            { type: "text-delta", textDelta: "Hello" },
            { type: "text-delta", textDelta: ", " },
            { type: "text-delta", textDelta: `world!` },

            {
              type: "finish",
              finishReason: "stop",
              logprobs: undefined,
              usage: { completionTokens: 10, promptTokens: 3 },
            },
          ],
        }),
      }),
    }),
    prompt: "Write a vegetarian lasagna recipe for 4 people.",
  });

  let count = 0;
  for await (const part of textStream) {
    console.log({ count, part });
    count++;
  }
})();

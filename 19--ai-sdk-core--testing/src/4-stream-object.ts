import { streamObject } from "ai";
import { MockLanguageModelV1, simulateReadableStream } from "ai/test";
import { ollama } from "ollama-ai-provider";
import { z } from "zod";

(async function () {
  const { textStream } = await streamObject({
    model: new MockLanguageModelV1({
      defaultObjectGenerationMode: "json",
      doStream: async () => ({
        stream: simulateReadableStream({
          chunks: [
            { type: "text-delta", textDelta: "{ " },
            { type: "text-delta", textDelta: '"content": ' },
            { type: "text-delta", textDelta: `"Hello, ` },
            { type: "text-delta", textDelta: `world` },
            { type: "text-delta", textDelta: `!"` },
            { type: "text-delta", textDelta: " }" },
            {
              type: "finish",
              finishReason: "stop",
              logprobs: undefined,
              usage: { completionTokens: 10, promptTokens: 3 },
            },
          ],
        }),
        rawCall: { rawPrompt: null, rawSettings: {} },
      }),
    }),
    schema: z.object({ content: z.string() }),
    prompt: "Hello, test!",
  });

  let count = 0;
  for await (const part of textStream) {
    console.log({ count, part });
    count++;
  }
})();

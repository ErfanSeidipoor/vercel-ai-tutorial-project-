import { openai } from "@ai-sdk/openai";
import { ollama } from "ollama-ai-provider";

import { appendResponseMessages, streamText } from "ai";
import { saveChat } from "@/tools/chat-store";

export async function POST(req: Request) {
  const { messages, id } = await req.json();

  const result = streamText({
    // model: openai("gpt-4o-mini"),
    model: ollama("llama3.2"),
    messages,
    async onFinish({ response }) {
      await saveChat({
        id,
        messages: appendResponseMessages({
          messages,
          responseMessages: response.messages,
        }),
      });
    },
  });

  return result.toDataStreamResponse();
}

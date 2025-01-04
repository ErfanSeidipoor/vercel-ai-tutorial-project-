import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.dir({ messages }, { depth: null });

  const result = streamText({
    model: openai("gpt-4-turbo"),
    messages,
  });

  return result.toDataStreamResponse();
}
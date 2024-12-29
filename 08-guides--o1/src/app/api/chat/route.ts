import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 300;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("o1-mini"),
    messages,
  });

  return result.toDataStreamResponse();
}

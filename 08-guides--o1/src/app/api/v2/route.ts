import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  console.log({ prompt });

  const { text } = await generateText({
    model: openai("o1-mini"),
    prompt: "Explain quantum entanglement briefly.",
    experimental_providerMetadata: {
      openai: {
        reasoningEffort: "low",
      },
    },
  });

  return NextResponse.json({ text });
}

import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  console.log({ prompt });

  const { object } = await generateObject({
    model: openai("gpt-3.5-turbo"),
    schema: z.object({
      recipe: z.object({
        name: z.string(),
        ingredients: z.array(
          z.object({ name: z.string(), amount: z.string() })
        ),
        steps: z.array(z.string()),
      }),
    }),
    prompt: "Generate a lasagna recipe.",
  });

  return NextResponse.json({ object });
}

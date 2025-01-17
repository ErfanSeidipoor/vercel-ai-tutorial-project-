import { streamText } from "ai";
// import { ollama } from "ollama-ai-provider";
import { tools } from "@/ai/tools";
import { openai } from "@ai-sdk/openai";

export async function POST(request: Request) {
  const { messages } = await request.json();

  try {
    const result = streamText({
      model: openai("gpt-3.5-turbo"),
      // model: ollama("llama3.2"),
      system: "You are a friendly assistant!",
      messages,
      maxSteps: 5,
      tools,
    });

    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        console.log(error);

        return "error";
      },
    });
  } catch (error) {
    console.log(error);

    return "error";
  }
}

import { ollama } from "ollama-ai-provider";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, user_id, customKey } = await req.json();
  // const { Authorization } = req.headers;

  console.log({
    Authorization: req.headers.get("Authorization"),
    messages,
    user_id,
    customKey,
  });

  const result = streamText({
    model: ollama("llama3.2-vision"),
    // model: openai("gpt-4-turbo"),
    system: "You are a helpful assistant.",
    messages,
  });
  return result.toDataStreamResponse({
    // sendUsage: false,
    sendUsage: true,
    getErrorMessage: (error) => {
      if (error == null) {
        return "unknown error";
      }

      if (typeof error === "string") {
        return error;
      }

      if (error instanceof Error) {
        return error.message;
      }

      return JSON.stringify(error);
    },
  });
}

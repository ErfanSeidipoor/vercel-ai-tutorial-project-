import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { ollama } from 'ollama-ai-provider';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { prompt, user_id }: { prompt: string, user_id: string } = await req.json();

    console.log({
        user_id,
        Authorization: req.headers.get("Authorization"),
    });

    const result = streamText({
        // model: openai('gpt-3.5-turbo'),
        model: ollama("llama3.2"),
        prompt,
    });

    return result.toDataStreamResponse({
        getErrorMessage: (error: unknown) => {
            return "Error"
        }
    });
}
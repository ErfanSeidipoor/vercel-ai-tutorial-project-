'use server';

import {
    getMutableAIState
} from "ai/rsc";
import { ReactNode } from "react";
import { openai } from '@ai-sdk/openai';
import { generateText } from "ai";


export type ServerMessage = {
    role: 'user' | 'assistant',
    content: string
}

export type ClientMessage = {
    id: string,
    role: 'user' | 'assistant';
    display: ReactNode,
}


export async function sendMessage(message: string): Promise<ClientMessage> {
    'use server';

    const history = getMutableAIState();

    console.log({ messages: history.get() });


    // Update the AI state with the new user message.
    history.update([...history.get(), { role: 'user', content: message }]);

    const response = await generateText({
        model: openai('gpt-3.5-turbo'),
        messages: history.get(),
    });

    // Update the AI state again with the response from the model.
    history.done([...history.get(), { role: 'assistant', content: response.text }]);


    return {
        id: Date.now().toString(), display: <b>{response.text}</b>, role: 'assistant'
    }
}

import { openai } from "@ai-sdk/openai";
import {
  CoreTool,
  CoreToolCallUnion,
  CoreToolResultUnion,
  generateText,
  tool,
} from "ai";
import { z } from "zod";
import { ollama } from "ollama-ai-provider";

const myToolSet = {
  firstTool: tool({
    description: "Greet the User",
    parameters: z.object({
      name: z.string(),
    }),
    execute: async ({ name }) => `Hello ${name}`,
  }),
  secondTool: tool({
    description: "Tell the User their age",
    parameters: z.object({
      age: z.string(),
    }),
    execute: async ({ age }) => `You are ${age} years old`,
  }),
};

type MyToolCall = CoreToolCallUnion<typeof myToolSet>;
// type MyToolCall = {
//     type: "tool-call";
//     toolCallId: string;
//     toolName: "firstTool";
//     args: {
//         name: string;
//     };
// } | {
//     type: "tool-call";
//     toolCallId: string;
//     toolName: "secondTool";
//     args: {
//         age: number;
//     };
// }
type MyToolResult = CoreToolResultUnion<typeof myToolSet>;
// type MyToolResult = {
//     type: "tool-result";
//     toolCallId: string;
//     toolName: "firstTool";
//     args: {
//         name: string;
//     };
//     result: string;
// } | {
//     type: "tool-result";
//     toolCallId: string;
//     toolName: "secondTool";
//     args: {
//         age: number;
//     };
//     result: string;
// }

async function generateSomething(prompt: string): Promise<{
  text: string;
  toolCalls: MyToolCall[];
  toolResults: MyToolResult[];
}> {
  return generateText({
    prompt,
    tools: myToolSet,
    // model: ollama("llama3.2"),
    model: openai("gpt-3.5-turbo"),
    maxSteps: 10,
  });
}
(async function () {
  console.dir(
    await generateSomething("Hi ,my name is John and I am 25 years old"),
    { depth: null }
  );
})();

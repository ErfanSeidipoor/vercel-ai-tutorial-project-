import { streamText } from "ai";
import * as readline from "node:readline/promises";
import { ollama } from "ollama-ai-provider";

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(async function () {
  while (true) {
    const userInput = await terminal.question("You: ");

    const result = await streamText({
      model: ollama("llama3.2"),
      prompt: userInput,
    });

    process.stdout.write("\n\n assistant:");
    for await (const message of result.textStream) {
      process.stdout.write(message);
    }
    process.stdout.write("\n\n");
  }
})();

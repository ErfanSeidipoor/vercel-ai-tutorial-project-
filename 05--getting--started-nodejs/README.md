# getting-started nodejs

This project is based on the [getting-started nodejs](https://sdk.vercel.ai/docs/getting-started/nodejs)

This is a simple Node.js project that utilizes the Vercel AI SDK to create an interactive chatbot.

### `src/index.ts`

This is the main entry point of our project, where we define the interface for our chatbot. It imports necessary modules from Vercel AI SDK and creates a
readline interface for user input. The script then enters an infinite loop where it prompts the user with a message, processes their response using the
`streamText` function from the `ai` module, and outputs the result.

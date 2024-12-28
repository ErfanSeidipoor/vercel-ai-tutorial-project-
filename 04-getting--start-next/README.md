# getting-started nextjs-app-router

This project is based on the [getting-started nextjs-app-router](https://sdk.vercel.ai/docs/getting-started/nextjs-app-router)

This is a tutorial project based on the Vercel AI documentation, utilizing the `vercel-ai` SDK to build a conversational chatbot.

## Files and Descriptions

### src/app/api/chat/route.ts

This file exports an API route for handling incoming user messages. It utilizes the `streamText` function from the `ai` library to process user input and generate responses using the Ollama AI model.

### src/app/page.tsx

This is a React component that renders the chat interface, allowing users to input text and receive responses from the Ollama AI model. The component uses the `useChat` hook to manage messages and update the UI in real-time.

# guides multi-modal-chatbot

This project is based on the [guides multi-modal-chatbot](https://sdk.vercel.ai/docs/guides/multi-modal-chatbot)

This is a demo application built using the AI SDK, showcasing a
multi-modal chatbot that can handle user input, image uploads, and
streaming responses from a large language model (LLM).

## Project Structure

The project consists of two main components: `app/page.tsx` and the
`/api/chat` Route Handler.

- `app/page.tsx`: This file contains the root page component that
  handles user input, displays chat messages, and uploads images.
- `/api/chat`: This is an API endpoint that accepts POST requests and
  interacts with the LLM to generate responses.

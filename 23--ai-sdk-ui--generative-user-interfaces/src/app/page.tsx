"use client";

import { useChat } from "ai/react";

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, error, reload } =
    useChat({
      onError: (error) => {
        console.log("An error occurred:", error);
      },
    });

  return (
    <div>
      {error && (
        <>
          <div>An error occurred.</div>
          <button type="button" onClick={() => reload()}>
            Retry
          </button>
        </>
      )}
      {messages.map((message) => (
        <div key={message.id}>
          <div>{message.role === "user" ? "User: " : "AI: "}</div>
          <div>{message.content}</div>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
      <pre>{JSON.stringify(messages, undefined, 2)}</pre>
    </div>
  );
}

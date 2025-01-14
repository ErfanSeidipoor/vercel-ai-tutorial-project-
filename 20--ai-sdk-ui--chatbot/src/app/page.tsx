"use client";

import { useChat } from "ai/react";
import { useRef, useState } from "react";

export default function Home() {
  const [files, setFiles] = useState<FileList | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    stop,
    reload,
    error,
    setMessages,
  } = useChat({
    // streamProtocol: "text",
    api: "/api/chat",
    body: {
      user_id: "123",
    },
    headers: {
      Authorization: "Bearer token",
    },
    onFinish: (message, { usage, finishReason }) => {
      console.log("Finished streaming message:", message);
      console.log("Token usage:", usage);
      console.log("Finish reason:", finishReason);
    },
    onError: (error) => {
      console.error("An error occurred:", error);
    },
    onResponse: (response) => {
      console.log("Received HTTP response from server:", response);
    },
  });

  const handleDelete = (id: string) => {
    setMessages(messages.filter((message) => message.id !== id));
  };

  return (
    <div>
      {isLoading && (
        <div>
          {"Spinner ..."}
          <button type="button" onClick={() => stop()}>
            Stop
          </button>
        </div>
      )}
      <button onClick={() => reload()} disabled={isLoading}>
        Regenerate
      </button>

      {messages.map((message) => (
        <div key={message.id}>
          {message.role}: {message.content}
          <button onClick={() => handleDelete(message.id)}>Delete</button>
        </div>
      ))}

      {error && (
        <>
          <div>An error occurred.</div>
          <button type="button" onClick={() => reload()}>
            Retry {error.message}
          </button>
        </>
      )}

      {/* <form onSubmit={handleSubmit}> */}
      <form
        onSubmit={(event) => {
          handleSubmit(event, {
            experimental_attachments: files,
            body: {
              customKey: "customValue",
            },
          });

          setFiles(undefined);

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
      >
        <input
          type="file"
          onChange={(event) => {
            if (event.target.files) {
              setFiles(event.target.files);
            }
          }}
          multiple
          ref={fileInputRef}
        />
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button type="submit"> Submit</button>
      </form>
    </div>
  );
}

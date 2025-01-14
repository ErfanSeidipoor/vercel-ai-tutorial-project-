"use client";

import { useChat } from "ai/react";
import { useState } from "react";
import { Attachment } from "@ai-sdk/ui-utils";

export default function Page() {
  const { messages, input, handleSubmit, handleInputChange, isLoading } =
    useChat({
      api: "/api/chat",
    });

  const [attachments] = useState<Attachment[]>([
    {
      name: "earth.png",
      contentType: "image/png",
      url: "https://as1.ftcdn.net/jpg/00/95/54/86/1000_F_95548617_aQWo5bIYrN9CblSMITDS7Bq4PyDTzrUP.webp",
    },
    // {
    //   name: "moon.png",
    //   contentType: "image/png",
    //   url: "data:image/png;base64,iVBORw0KGgo...",
    // },
  ]);

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <div>{`${message.role}: `}</div>

            <div>
              {message.content}

              <div>
                {message.experimental_attachments
                  ?.filter((attachment) =>
                    attachment.contentType?.startsWith("image/")
                  )
                  .map((attachment, index) => (
                    <img
                      key={`${message.id}-${index}`}
                      src={attachment.url}
                      alt={attachment.name}
                    />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          handleSubmit(event, {
            experimental_attachments: attachments,
          });
        }}
      >
        <input
          value={input}
          placeholder="Send message..."
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </form>
    </div>
  );
}

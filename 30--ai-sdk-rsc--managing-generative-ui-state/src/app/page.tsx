'use client';

import { useActions, useUIState } from 'ai/rsc';
import { AI } from './ai';

export default function Page() {
  const { sendMessage } = useActions<typeof AI>();
  const [messages, setMessages] = useUIState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await sendMessage(event.target.message.value);

    console.log({ messages, response });


    setMessages([
      ...messages,
      { id: Date.now() - 1, role: 'user', display: event.target.message.value },
      { ...response },
    ]);
  };

  return (
    <>
      <ul>
        {messages.map(message => (
          <li key={message.id}>{message.display}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
      <pre>{JSON.stringify(messages, undefined, 2)}</pre>

    </>
  );
}
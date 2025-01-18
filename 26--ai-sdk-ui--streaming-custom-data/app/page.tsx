'use client';

import { useChat } from 'ai/react';
import { useEffect } from 'react';

export default function Page() {
  const { messages, input, setInput, handleSubmit, isLoading, handleInputChange, data, setData } = useChat({
    experimental_throttle: 50,
  });

  useEffect(() => {
    console.log({ data, messages });
  }, [data, messages])

  return (
    <div>
      <form onSubmit={e => {
        // set new data
        // setData([{ test: 'value' }]);
        setData(undefined); // clear stream data
        handleSubmit(e);
      }}>
        <input
          name="prompt"
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button type="submit"> Submit</button>
      </form>

      <pre>{JSON.stringify({ messages, data }, undefined, 2)}</pre>
    </div>
  );
}
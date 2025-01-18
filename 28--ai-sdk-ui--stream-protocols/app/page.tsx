'use client';

import { useCompletion } from 'ai/react';
import { useEffect } from 'react';

export default function Page() {
  const { completion, input, handleInputChange, handleSubmit, data } = useCompletion({
    // streamProtocol: 'text',
    streamProtocol: 'data',
  });

  useEffect(() => {
    console.log({ completion, data });
  }, [completion, data])

  return (
    <form onSubmit={handleSubmit}>
      <input name="prompt" value={input} onChange={handleInputChange} />
      <button type="submit">Submit</button>
      <div>{completion}</div>
    </form>
  );
}
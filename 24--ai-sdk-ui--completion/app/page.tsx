'use client';

import { Message, useCompletion } from 'ai/react';
import { useEffect } from 'react';

export default function Page() {
  const { completion, input, handleInputChange, handleSubmit, isLoading, error, setInput, stop } = useCompletion({
    api: '/api/completion',
    experimental_throttle: 50,
    onResponse: (response: Response) => {
      console.log('Received response from server:', response)
    },
    onFinish: (prompt: string, completion: string) => {
      console.log('Finished streaming message:', completion)
    },
    onError: (error: Error) => {
      console.error('An error occurred:', error)
    },
    headers: {
      Authorization: 'your_token',
    },
    body: {
      user_id: '123',
    },
    credentials: 'same-origin',
  });

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error])

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="prompt"
        value={input}
        onChange={handleInputChange}
        id="input"
      />
      <input
        name="prompt"
        value={input}
        onChange={e => setInput(e.target.value)}
        id="input"
      />
      <button type="submit">Submit</button>
      <button onClick={stop} disabled={!isLoading}>Stop</button>
      {isLoading ? <div>Loading...</div> : null}
      <div>{completion}</div>
      {error ? <div>{error.message}</div> : null}

    </form>
  );
}
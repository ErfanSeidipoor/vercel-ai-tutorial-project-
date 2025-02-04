# AI SDK RSC Managing Generative UI State

This project is based on the [AI SDK RSC Managing Generative UI State](https://sdk.vercel.ai/docs/ai-sdk-rsc/generative-ui-state)

# AI SDK RSC: Managing Generative UI State

For example, in a chatbot, state is an array of messages where each message has:

id: a unique identifier
role: who sent the message (user/assistant/system/tool)
content: the content of the message
This state can be rendered in the UI and sent to the model without any modifications.

With Generative UI, the model can now return a React component, rather than a plain text message. The client can render that component without issue, but that state can't be sent back to the model because React components aren't serialisable. So, what can you do?

The solution is to split the state in two, where one (AI State) becomes a proxy for the other (UI State).

One way to understand this concept is through a Lego analogy. Imagine a 10,000 piece Lego model that, once built, cannot be easily transported because it is fragile. By taking the model apart, it can be easily transported, and then rebuilt following the steps outlined in the instructions pamphlet. In this way, the instructions pamphlet is a proxy to the physical structure. Similarly, AI State provides a serialisable (JSON) representation of your UI that can be passed back and forth to the model.
import { generateText } from "ai";
import { ollama } from "ollama-ai-provider";

(async function () {
  const response = await generateText({
    model: ollama("llama3.2"),
    messages: [
      { role: "system", content: "You help planning travel itineraries." },
      {
        role: "user",
        content:
          "I am planning a trip to Berlin for 3 days. Please suggest the best tourist activities for me to do.",
      },
    ],
  });

  console.log(response.text);
})();

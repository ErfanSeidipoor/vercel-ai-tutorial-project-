import { generateText } from "ai";
import { ollama } from "ollama-ai-provider";

(async function () {
  const destination = "Paris";
  const lengthOfStay = 5;

  const response = await generateText({
    model: ollama("llama3.2"),
    prompt:
      `I am planning a trip to ${destination} for ${lengthOfStay} days. ` +
      `Please suggest the best tourist activities for me to do.`,
  });

  console.log(response.text);
})();

import { generateText } from "ai";
import { ollama } from "ollama-ai-provider";

(async function () {
  const destination = "Paris";
  const lengthOfStay = 5;

  const response = await generateText({
    model: ollama("llama3.2"),
    system:
      `You help planning travel itineraries. ` +
      `Respond to the users' request with a list ` +
      `of the best stops to make in their destination.`,
    prompt:
      `I am planning a trip to ${destination} for ${lengthOfStay} days. ` +
      `Please suggest the best tourist activities for me to do.`,
  });

  console.log(response.text);
})();

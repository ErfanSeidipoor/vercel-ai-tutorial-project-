import { generateText } from "ai";
import { ollama } from "ollama-ai-provider";

const article = `
Featured articles in Wikipedia

This star symbolizes the featured content on Wikipedia.
Featured articles are considered to be some of the best articles Wikipedia has to offer, as determined by Wikipedia's editors. They are used by editors as examples for writing other articles. Before being listed here, articles are reviewed as featured article candidates for accuracy, neutrality, completeness, and style according to our featured article criteria. Many featured articles were previously good articles (which are reviewed with a less restrictive set of criteria). There are 6,645 featured articles out of 6,933,562 articles on the English Wikipedia (about 0.1% or one out of every 1,040 articles). Articles that no longer meet the criteria can be proposed for improvement or removal at featured article review.

On non-mobile versions of our website, a small bronze star icon (This star symbolizes the featured content on Wikipedia.) on the top right corner of an article's page indicates that the article is featured. On most smartphones and tablets you can also select "Desktop" at the very bottom of the page or "Request Desktop Site" in your browser's menu to see this line (do a search to find out how). Additionally, if the current article is featured in another language, a yellow star will appear next to the corresponding entry in the language switcher to let you know.
`;

(async function () {
  const response = await generateText({
    model: ollama("llama3.2"),
    system:
      "You are a professional writer. " +
      "You write simple, clear, and concise content.",
    prompt: `Summarize the following article in 3-5 sentences: ${article}`,
  });

  console.log(response.text);
})();

import { openai } from "@ai-sdk/openai";
import { experimental_generateImage as generateImage } from "ai";
import { ollama } from "ollama-ai-provider";
const fs = require("fs");
const path = require("path");

(async function () {
  const { image } = await generateImage({
    // model: openai.embedding("text-embedding-3-small"),
    model: openai.image("dall-e-3"),
    prompt: "Santa Claus driving a Cadillac",
  });

  const base64 = image.base64; // base64 image data
  const uint8Array = image.uint8Array; // Uint8Array image data

  // Save base64 image data to a file
  const base64FilePath = path.join(__dirname, "image_base64.txt");
  fs.writeFileSync(base64FilePath, base64, "utf8");

  // Save Uint8Array image data to a file
  const uint8ArrayFilePath = path.join(__dirname, "image_uint8Array.png");
  fs.writeFileSync(uint8ArrayFilePath, Buffer.from(uint8Array));
})();

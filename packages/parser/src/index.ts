import { GoogleGenAI, MediaResolution } from "@google/genai";
import { env } from "./config/env.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import z from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const ai = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
  });

  //   const groundingTool = {
  //     googleSearch: {},
  //   };
  //   const config = {
  //     tools: [groundingTool],
  //   };

  //   const response = await ai.models.generateContent({
  //     model: "gemini-3-flash-preview",
  //     contents: "Find the direct download link for the 2024-2025 Stanford CDS",
  //     //   "Find the direct link for the 2024-2025 Stanford CDS. Your response should only contain the direct link, nothing else. Do not explain. Do not include any other text in your response. If you cannot find the direct link, return 'NOT_FOUND' and nothing else. The link may be a PDF file or a Google Drive link.",
  //     //   "Find the direct link for the 2024-2025 Stanford CDS. If you cannot find the direct link, return 'NOT_FOUND' and nothing else. The link may be a PDF file or a Google Drive link.",
  //     //   "Find the link to where Stanford Common Data Sets are available for download. Your response should only contain the link to this landing page, nothing else. Do not explain. Do not include any other text in your response. If you cannot find the link, return 'NOT_FOUND' and nothing else.",
  //     config,
  //   });

  //   console.log(response.usageMetadata);
  //   console.log(response.text);

  //   return;

  const filename = "stanford_cds_2024_2025.pdf";

  const fileData = await fs.readFile(
    path.join(__dirname, "..", "example", filename),
  );
  const fileBlob = new Blob([fileData], { type: "application/pdf" });

  const file = await ai.files.upload({
    file: fileBlob,
    config: {
      mimeType: "application/pdf",
    },
  });
  console.log(file.uri);

  const systemInstruction = `You are a helpful assistant that parses the Common Data Set (CDS) of a university. You are given a PDF file of the CDS and a question. You need to parse the CDS and answer the question. Only return the answer, no other text. Do not explain. Do not include any other text in your response. If you cannot find the answer, return 'NOT_FOUND' and nothing else.`;

  const cache = await ai.caches.create({
    model: "gemini-3-flash-preview",
    config: {
      displayName: filename,
      ttl: "300s",
      systemInstruction,
      contents: [
        {
          role: "user",
          parts: [
            {
              fileData: {
                fileUri: file.uri,
                mimeType: file.mimeType,
              },
            },
          ],
        },
      ],
    },
  });

  const responseSchema = z.object({
    source_of_institutional_control: z.enum([
      "public",
      "private",
      "proprietary",
    ]),
  });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [
          {
            // text: "Section B1: What is the total number of Degree-seeking, first-time first-year students that are Men?",
            text: "Section A1: What is the source of institutional control?",
          },
        ],
      },
    ],
    config: {
      mediaResolution: MediaResolution.MEDIA_RESOLUTION_HIGH,
      responseMimeType: "application/json",
      responseJsonSchema: responseSchema,
      cachedContent: cache.name,
    },
  });

  if (!response.text) {
    throw new Error("No response text");
  }

  const responseJson = responseSchema.parse(JSON.parse(response.text));

  // Input cost: $0.50 per million tokens
  // Output cost: $3.00 per million tokens
  // Context caching: $0.05 (text / image / video)

  console.log(responseJson);
  console.log(response.text);
  console.log(response.usageMetadata?.totalTokenCount);
  console.log(response.usageMetadata?.promptTokenCount);
  console.log(response.usageMetadata);
})();

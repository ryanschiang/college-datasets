import { GoogleGenAI, MediaResolution } from "@google/genai";
import type { File, Pager } from "@google/genai";
import { env } from "./config/env.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import z from "zod/v3";
import { zodToJsonSchema } from "zod-to-json-schema";
import { splitSchema } from "./utils/split-schema.ts";
import { cdsSchema } from "./schemas/cds-schema.ts";
import { logger } from "./config/logger.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFile = async (
  ai: GoogleGenAI,
  filename: string,
  mimeType: string,
): Promise<File> => {
  logger.info(`Uploading file ${filename} with mime type ${mimeType}`);
  const fileData = await fs.readFile(
    path.join(__dirname, "..", "example", filename),
  );
  const fileBlob = new Blob([fileData], { type: mimeType });
  const file = await ai.files.upload({
    file: fileBlob,
    config: {
      mimeType,
    },
  });
  logger.info(`File uploaded successfully: ${file.name} | ${file.uri}`);
  return file;
};

const listFiles = async (ai: GoogleGenAI): Promise<Pager<File>> => {
  const files = await ai.files.list({
    config: {},
  });
  return files;
};

(async () => {
  const OUTPUT_NAME = "stanford";

  const MODEL = "gemini-3-flash-preview" as const;
  const ai = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
  });

  const filename = "stanford_cds_2024_2025.pdf";

  const file = await uploadFile(ai, filename, "application/pdf");

  const systemInstruction = `You are a helpful assistant that parses the Common Data Set (CDS) of a university. You are given a PDF file of the CDS and a question. You need to parse the CDS and answer the question. Only return the answer, no other text. Do not explain. Do not include any other text in your response. If you cannot find the answer, return 'NOT_FOUND' and nothing else.`;

  const cache = await ai.caches.create({
    model: "gemini-3-flash-preview",
    config: {
      displayName: filename,
      ttl: "3600s", // 1 hour
      systemInstruction,
      contents: [
        {
          role: "user",
          parts: [
            {
              fileData: {
                fileUri: file.uri,
                mimeType: file.mimeType,
                // fileUri: "https://generativelanguage.googleapis.com/v1beta/files/jde7ehasks7j",
                // mimeType: "application/pdf",
              },
            },
          ],
        },
      ],
    },
  });

  // Split schema to a reasonable size
  const responseSchemas = splitSchema(cdsSchema, 50);
  logger.info(`Splitting schema into ${responseSchemas.length} chunks`);

  // Fire off all API requests in parallel
  logger.info(`Sending ${responseSchemas.length} requests in parallel...`);

  const apiPromises = responseSchemas.map((responseSchema, index) => {
    if (!responseSchema) {
      logger.warn(`No response schema found for chunk ${index + 1}`);
      return Promise.resolve(null);
    }

    logger.info(
      `Sending request for chunk ${index + 1} of ${responseSchemas.length}`,
    );

    return ai.models
      .generateContent({
        model: MODEL,
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
          responseJsonSchema: zodToJsonSchema(responseSchema),
          cachedContent: cache.name,
        },
      })
      .then((response) => ({ response, responseSchema, index }));
  });

  // Wait for all requests to complete
  const results = await Promise.allSettled(apiPromises);

  // Process results
  let finalCost = 0;

  // Input cost: $0.50 per million tokens
  // Output cost: $3.00 per million tokens
  // Context caching: $0.05 (text / image / video)
  // Context caching $1.00 / 1,000,000 tokens per hour (storage price)
  const RATES = {
    INPUT: 0.5,
    OUTPUT: 3.0,
    CACHE: 0.05,
  };

  const writePromises: Promise<void>[] = [];
  const combinedResponse: Record<string, unknown> = {};

  for (const result of results) {
    if (result.status === "rejected") {
      logger.error(`Request failed: ${result.reason}`);
      continue;
    }

    const value = result.value;
    if (!value) continue;

    const { response, responseSchema, index } = value;

    logger.info(`Processing chunk ${index + 1} of ${responseSchemas.length}`);

    if (!response.text) {
      logger.error(`No response text for chunk ${index + 1}`);
      continue;
    }

    const rawResponse = JSON.parse(response.text);
    const responseJson = responseSchema.parse(rawResponse);

    // Merge chunk data into combined response
    Object.assign(combinedResponse, responseJson);

    // Write individual chunk file
    writePromises.push(
      fs.writeFile(
        path.join(
          __dirname,
          "..",
          "output",
          `${OUTPUT_NAME}-${index + 1}.json`,
        ),
        JSON.stringify(responseJson, null, 2),
      ),
    );

    if (!response.usageMetadata) {
      logger.warn(`No usage metadata for chunk ${index + 1}`);
      continue;
    }

    const {
      promptTokenCount = 0,
      candidatesTokenCount = 0,
      cachedContentTokenCount = 0,
      thoughtsTokenCount = 0,
    } = response.usageMetadata;

    // Calculate how much of the prompt was not cached (new/uncached tokens)
    const newPromptTokenCount = promptTokenCount - cachedContentTokenCount;

    // Charged at prompt rate
    const promptCost = (newPromptTokenCount / 1_000_000) * RATES.INPUT;
    // Charged at output rate
    const candidatesCost = (candidatesTokenCount / 1_000_000) * RATES.OUTPUT;
    // Charged at output rate
    const thoughtsCost = (thoughtsTokenCount / 1_000_000) * RATES.OUTPUT;
    // Charged at context caching rate (discounted)
    const cachedCost = (cachedContentTokenCount / 1_000_000) * RATES.CACHE;

    // Total cost
    const totalTokens =
      newPromptTokenCount +
      candidatesTokenCount +
      thoughtsTokenCount +
      cachedContentTokenCount;
    const totalCost = promptCost + candidatesCost + thoughtsCost + cachedCost;

    logger.info(
      `Chunk ${index + 1} Tokens - Prompt: $${newPromptTokenCount}, Candidates: $${candidatesTokenCount}, Thoughts: $${thoughtsTokenCount}, Cached: $${cachedContentTokenCount}, Total: $${totalTokens}`,
    );
    logger.info(
      `Chunk ${index + 1} Cost - Prompt: $${promptCost.toFixed(6)}, Candidates: $${candidatesCost.toFixed(6)}, Thoughts: $${thoughtsCost.toFixed(6)}, Cached: $${cachedCost.toFixed(6)}, Total: $${totalCost.toFixed(6)}`,
    );

    finalCost += totalCost;
  }

  // Write combined response file
  writePromises.push(
    fs.writeFile(
      path.join(__dirname, "..", "output", `${OUTPUT_NAME}.json`),
      JSON.stringify(combinedResponse, null, 2),
    ),
  );

  // Wait for all file writes to complete
  await Promise.all(writePromises);
  logger.info(
    `Written combined response to output/response-combined.json with ${Object.keys(combinedResponse).length} keys`,
  );

  logger.info(`Total cost: $${finalCost.toFixed(6)}`);
})();

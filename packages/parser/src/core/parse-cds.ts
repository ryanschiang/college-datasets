import { GoogleGenAI, MediaResolution } from "@google/genai";
import type { File, Pager } from "@google/genai";
import { env } from "@/config/env.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { zodToJsonSchema } from "zod-to-json-schema";
import { splitSchema } from "@/utils/split-schema.ts";
import { cdsSchema } from "@/schemas/cds-schema.ts";
import { logger } from "@/config/logger.ts";
import z from "zod/v3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadFile = async (ai: GoogleGenAI, filepath: string, mimeType: string): Promise<File> => {
  logger.info(`Uploading file ${filepath} with mime type ${mimeType}`);
  const fileData = await fs.readFile(filepath);
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

export const parseCDS = async (key: string, filename: string, filepath: string, mimeType: string) => {
  const SCHEMA_FIELDS_LIMIT = 50;
  const MODEL = "gemini-3-flash-preview" as const;
  const OUTPUT_DIR = path.join(__dirname, "..", "..", "data", "output", key);
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const ai = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
  });

  const file = await uploadFile(ai, filepath, mimeType);

  const systemInstruction = `You are a helpful assistant that parses the Common Data Set (CDS) of a university. You are given a PDF file of the CDS and a question. You need to parse the CDS and answer the question. Only return the answer, no other text. Do not explain. Do not include any other text in your response. If you cannot find the answer, return 'NOT_FOUND' and nothing else.`;

  logger.info(`Creating file cache for ${filename}...`);
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
              },
            },
          ],
        },
      ],
    },
  });
  logger.info(`File cache for ${filename} created successfully!`);

  // First, get CDS year as sanity check
  const yearResponseSchema = z.object({
    start_year: z.number().optional().describe("The academic start year of the CDS document, e.g. 2024 for the 2024-25 academic year"),
    end_year: z.number().optional().describe("The academic end year of the CDS document, e.g. 2025 for the 2024-25 academic year"),
  });

  const yearResponse = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            text: "What is the year of the Common Data Set (CDS) document?",
          },
        ],
      },
    ],
    config: {
      mediaResolution: MediaResolution.MEDIA_RESOLUTION_HIGH,
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(yearResponseSchema),
      cachedContent: cache.name,
    },
  });
  if (!yearResponse.text) {
    logger.error("No year response text");
    return;
  }
  const rawYearResponse = JSON.parse(yearResponse.text);
  const yearResponseJson = yearResponseSchema.parse(rawYearResponse);
  const { start_year, end_year } = yearResponseJson;
  if (!start_year || !end_year) {
    logger.error("No start or end year found in year response", {
      rawYearResponse,
    });
    return;
  }
  if (start_year > end_year) {
    logger.error("Start year is greater than end year", {
      rawYearResponse,
    });
    return;
  }
  if (start_year < 2023) {
    logger.error("Start year is before 2023, too old", {
      rawYearResponse,
    });
    return;
  }

  // Split schema to a reasonable size
  const responseSchemas = splitSchema(cdsSchema, SCHEMA_FIELDS_LIMIT);
  logger.info(`Splitting schema into ${responseSchemas.length} chunks of length ${SCHEMA_FIELDS_LIMIT} or less`);

  // Fire off all API requests in parallel
  logger.info(`Sending ${responseSchemas.length} requests in parallel...`);

  const apiPromises = responseSchemas.map((responseSchema, index) => {
    if (!responseSchema) {
      logger.warn(`No response schema found for chunk ${index + 1}`);
      return Promise.resolve(null);
    }

    logger.info(`Sending request for chunk ${index + 1} of ${responseSchemas.length} (${responseSchema.shape.length} fields)`);

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
  let finalPromptTokenCount = 0;
  let finalCandidatesTokenCount = 0;
  let finalThoughtsTokenCount = 0;
  let finalCachedTokenCount = 0;
  let finalPromptCost = 0;
  let finalCandidatesCost = 0;
  let finalThoughtsCost = 0;
  let finalCachedCost = 0;
  let finalTokenCount = 0;
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
  const combinedResponse: Record<string, unknown> = {
    start_year,
    end_year,
  };

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
    writePromises.push(fs.writeFile(path.join(OUTPUT_DIR, `${key}-${index + 1}.json`), JSON.stringify(responseJson, null, 2)));

    if (!response.usageMetadata) {
      logger.warn(`No usage metadata for chunk ${index + 1}`);
      continue;
    }

    const { promptTokenCount = 0, candidatesTokenCount = 0, cachedContentTokenCount = 0, thoughtsTokenCount = 0 } = response.usageMetadata;

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
    const totalTokens = newPromptTokenCount + candidatesTokenCount + thoughtsTokenCount + cachedContentTokenCount;
    const totalCost = promptCost + candidatesCost + thoughtsCost + cachedCost;

    logger.info(
      `Chunk ${index + 1} Tokens - Prompt: $${newPromptTokenCount}, Candidates: $${candidatesTokenCount}, Thoughts: $${thoughtsTokenCount}, Cached: $${cachedContentTokenCount}, Total: $${totalTokens}`,
    );
    logger.info(
      `Chunk ${index + 1} Cost - Prompt: $${promptCost.toFixed(6)}, Candidates: $${candidatesCost.toFixed(6)}, Thoughts: $${thoughtsCost.toFixed(6)}, Cached: $${cachedCost.toFixed(6)}, Total: $${totalCost.toFixed(6)}`,
    );

    finalPromptTokenCount += newPromptTokenCount;
    finalCandidatesTokenCount += candidatesTokenCount;
    finalThoughtsTokenCount += thoughtsTokenCount;
    finalCachedTokenCount += cachedContentTokenCount;
    finalPromptCost += promptCost;
    finalCandidatesCost += candidatesCost;
    finalThoughtsCost += thoughtsCost;
    finalCachedCost += cachedCost;
    finalTokenCount += totalTokens;
    finalCost += totalCost;
  }

  // Write combined response file

  const outputContent = {
    metadata: {
      tokens: {
        promptTokenCount: finalPromptTokenCount,
        candidatesTokenCount: finalCandidatesTokenCount,
        thoughtsTokenCount: finalThoughtsTokenCount,
        cachedTokenCount: finalCachedTokenCount,
        totalTokenCount: finalTokenCount,
      },
      cost: {
        promptCost: finalPromptCost,
        candidatesCost: finalCandidatesCost,
        thoughtsCost: finalThoughtsCost,
        cachedCost: finalCachedCost,
        totalCost: finalCost,
      },
    },
    data: combinedResponse,
  };

  const finalResponseFilename = path.join(OUTPUT_DIR, `${key}.json`);
  writePromises.push(fs.writeFile(finalResponseFilename, JSON.stringify(outputContent, null, 2)));

  // Wait for all file writes to complete
  await Promise.all(writePromises);
  logger.info(`Written combined response to ${finalResponseFilename} with ${Object.keys(combinedResponse).length} keys`);

  logger.info(`Total cost: $${finalCost.toFixed(6)}`);
};

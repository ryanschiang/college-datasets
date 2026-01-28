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

const inputSchema = z.object({
  number_of_enrolled_students_awarded_aid: z
    .object({
      col_headings: z.array(z.string()),
      rows: z.array(
        z.object({
          row_name: z.string(),
          cells: z.array(z.number()),
        }),
      ),
    })
    .describe("H2: Number of Enrolled Students Awarded Aid"),
});

(async () => {
  const ai = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
  });

  const rawTableData = await fs.readFile(path.join(__dirname, "..", "example", `response-test.json`), "utf8");
  const tableData = JSON.parse(rawTableData) as z.infer<typeof inputSchema>;

  const colHeadings = tableData.number_of_enrolled_students_awarded_aid.col_headings;
  const rowHeadings = tableData.number_of_enrolled_students_awarded_aid.rows.map((row) => row.row_name);

  const outputSchema = z.object({
    key_names: z.array(
      z.object({
        name: z.string().describe("The name of the key combining the column and row heading, e.g. (number_of_ftfy_students_awarded_aid)"),
        type: z.enum(["number", "string", "boolean"]).describe("The type of the value, e.g. number, string, boolean"),
        units: z.enum(["unitless", "percentage", "dollars"]).nullable().describe("The units of the value, e.g. unitless, percentage, dollars"),
        description: z.string().describe("The column and row heading separated by a pipe, e.g. (First-time Full-time First-year Students | Number of degree-seeking undergraduate students (CDS Item B1 if reporting on Fall 2024 cohort))"),
      }),
    ),
  });

  logger.info(`Sending request to generate content`);
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Given the following column and row headings, generate key names and types for each cell in the table. Since there are ${rowHeadings.length} rows and ${colHeadings.length} columns, there will be ${rowHeadings.length * colHeadings.length} keys.`,
          },
          {
            text: `Column Headings: ${colHeadings.map((heading) => `\`${heading}\``).join(", ")}`,
          },
          {
            text: `Column Headings: ${colHeadings.map((heading) => `\`${heading}\``).join(", ")}`,
          },
        ],
      },
    ],
    config: {
      mediaResolution: MediaResolution.MEDIA_RESOLUTION_HIGH,
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(outputSchema),
    },
  });

  if (!response.text) {
    logger.error(`No response text`);
    return;
  }

  const rawResponse = JSON.parse(response.text);
  const responseJson = outputSchema.parse(rawResponse);

  logger.info(`Saving response to file`);
  await fs.writeFile(path.join(__dirname, "..", "example", `response-test2.json`), JSON.stringify(responseJson, null, 2));

  // Split schema to a reasonable size
  //   const responseSchemas = splitSchema(cdsSchema, 50);
  //   logger.info(`Splitting schema into ${responseSchemas.length} chunks`);

  //   // Fire off all API requests in parallel
  //   logger.info(`Sending ${responseSchemas.length} requests in parallel...`);

  //   const apiPromises = responseSchemas.map((responseSchema, index) => {
  //     if (!responseSchema) {
  //       logger.warn(`No response schema found for chunk ${index + 1}`);
  //       return Promise.resolve(null);
  //     }

  //     logger.info(`Sending request for chunk ${index + 1} of ${responseSchemas.length}`);

  //     return ai.models
  //       .generateContent({
  //         model: "gemini-3-flash-preview",
  //         contents: [
  //           {
  //             role: "user",
  //             parts: [
  //               {
  //                 // text: "Section B1: What is the total number of Degree-seeking, first-time first-year students that are Men?",
  //                 text: "Section A1: What is the source of institutional control?",
  //               },
  //             ],
  //           },
  //         ],
  //         config: {
  //           mediaResolution: MediaResolution.MEDIA_RESOLUTION_HIGH,
  //           responseMimeType: "application/json",
  //           responseJsonSchema: zodToJsonSchema(responseSchema),
  //           cachedContent: cache.name,
  //         },
  //       })
  //       .then((response) => ({ response, responseSchema, index }));
  //   });

  //   // Wait for all requests to complete
  //   const results = await Promise.allSettled(apiPromises);

  //   // Process results
  //   let finalCost = 0;

  //   // Input cost: $0.50 per million tokens
  //   // Output cost: $3.00 per million tokens
  //   // Context caching: $0.05 (text / image / video)
  //   // Context caching $1.00 / 1,000,000 tokens per hour (storage price)
  //   const RATES = {
  //     INPUT: 0.5,
  //     OUTPUT: 3.0,
  //     CACHE: 0.05,
  //   };

  //   const writePromises: Promise<void>[] = [];

  //   for (const result of results) {
  //   if (result.status === "rejected") {
  //     logger.error(`Request failed: ${result.reason}`);
  //     continue;
  //   }

  //   const value = result.value;
  //   if (!value) continue;

  //   const { response, responseSchema, index } = value;

  //   logger.info(`Processing chunk ${index + 1} of ${responseSchemas.length}`);

  //   if (!response.text) {
  //     logger.error(`No response text for chunk ${index + 1}`);
  //     continue;
  //   }

  //   const rawResponse = JSON.parse(response.text);
  //   const responseJson = responseSchema.parse(rawResponse);
  //     writePromises.push(fs.writeFile(path.join(__dirname, "..", "example", `response-${index + 1}.json`), JSON.stringify(responseJson, null, 2)));

  //     if (!response.usageMetadata) {
  //       logger.warn(`No usage metadata for chunk ${index + 1}`);
  //       continue;
  //     }

  //     const { promptTokenCount = 0, candidatesTokenCount = 0, cachedContentTokenCount = 0, thoughtsTokenCount = 0 } = response.usageMetadata;

  //     // Calculate how much of the prompt was not cached (new/uncached tokens)
  //     const newPromptTokenCount = promptTokenCount - cachedContentTokenCount;

  //     // Charged at prompt rate
  //     const promptCost = (newPromptTokenCount / 1_000_000) * RATES.INPUT;
  //     // Charged at output rate
  //     const candidatesCost = (candidatesTokenCount / 1_000_000) * RATES.OUTPUT;
  //     // Charged at output rate
  //     const thoughtsCost = (thoughtsTokenCount / 1_000_000) * RATES.OUTPUT;
  //     // Charged at context caching rate (discounted)
  //     const cachedCost = (cachedContentTokenCount / 1_000_000) * RATES.CACHE;

  //     // Total cost
  //     const totalTokens = newPromptTokenCount + candidatesTokenCount + thoughtsTokenCount + cachedContentTokenCount;
  //     const totalCost = promptCost + candidatesCost + thoughtsCost + cachedCost;

  //     logger.info(`Chunk ${index + 1} Tokens - Prompt: $${newPromptTokenCount}, Candidates: $${candidatesTokenCount}, Thoughts: $${thoughtsTokenCount}, Cached: $${cachedContentTokenCount}, Total: $${totalTokens}`);
  //     logger.info(`Chunk ${index + 1} Cost - Prompt: $${promptCost.toFixed(6)}, Candidates: $${candidatesCost.toFixed(6)}, Thoughts: $${thoughtsCost.toFixed(6)}, Cached: $${cachedCost.toFixed(6)}, Total: $${totalCost.toFixed(6)}`);

  //     finalCost += totalCost;
  //   }

  //   // Wait for all file writes to complete
  //   await Promise.all(writePromises);

  //   logger.info(`Total cost: $${finalCost.toFixed(6)}`);
})();

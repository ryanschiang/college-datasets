import { GoogleGenAI, MediaResolution } from "@google/genai";
import { env } from "./config/env.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import z from "zod/v3";
import { zodToJsonSchema } from "zod-to-json-schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const ai = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
  });

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
    source_of_institutional_control: z
      .enum(["public", "private", "proprietary"])
      .describe("A2: Source of institutional control"),
    undergraduate_institution_classification: z
      .enum(["coed", "mens", "womens"])
      .describe("A3: Classify your undergraduate institution"),
    academic_year_calendar: z
      .enum([
        "semester",
        "quarter",
        "trimester",
        "4-1-4",
        "continuous",
        "differs_by_program",
        "other",
      ])
      .describe("A4: Academic year calendar"),
    degrees_offered: z
      .array(
        z.enum([
          "certificate",
          "diploma",
          "associate",
          "transfer_associate",
          "terminal_associate",
          "bachelors",
          "postbachelors_certificate",
          "masters",
          "postmasters_certificate",
          "doctoral_degree_research_scholarship",
          "doctoral_degree_professional_practice",
          "doctoral_degree_other",
        ]),
      )
      .describe("A5: Degrees offered by your institution"),
    undergraduate_students_full_time: z
      .object({
        degree_seeking_first_time_first_year_men: z
          .number()
          .describe("B1: Degree-seeking, first-time first-year students Men"),
        degree_seeking_first_time_first_year_women: z
          .number()
          .describe("B1: Degree-seeking, first-time first-year students Women"),
        degree_seeking_first_time_first_year_another_gender: z
          .number()
          .describe(
            "B1: Degree-seeking, first-time first-year students Another Gender",
          ),
        degree_seeking_first_time_first_year_unknown: z
          .number()
          .describe(
            "B1: Degree-seeking, first-time first-year students Unknown",
          ),
        other_first_year_degree_seeking_men: z
          .number()
          .describe("B1: Other first-year, degree-seeking Men"),
        other_first_year_degree_seeking_women: z
          .number()
          .describe("B1: Other first-year, degree-seeking Women"),
        other_first_year_degree_seeking_another_gender: z
          .number()
          .describe("B1: Other first-year, degree-seeking Another Gender"),
        other_first_year_degree_seeking_unknown: z
          .number()
          .describe("B1: Other first-year, degree-seeking Unknown"),
        all_other_degree_seeking_men: z
          .number()
          .describe("B1: All other degree-seeking Men"),
        all_other_degree_seeking_women: z
          .number()
          .describe("B1: All other degree-seeking Women"),
        all_other_degree_seeking_another_gender: z
          .number()
          .describe("B1: All other degree-seeking Another Gender"),
        all_other_degree_seeking_unknown: z
          .number()
          .describe("B1: All other degree-seeking Unknown"),
        total_degree_seeking_men: z
          .number()
          .describe("B1: Total degree-seeking Men"),
        total_degree_seeking_women: z
          .number()
          .describe("B1: Total degree-seeking Women"),
        total_degree_seeking_another_gender: z
          .number()
          .describe("B1: Total degree-seeking Another Gender"),
        total_degree_seeking_unknown: z
          .number()
          .describe("B1: Total degree-seeking Unknown"),
        all_other_undergraduates_enrolled_in_credit_courses_men: z
          .number()
          .describe(
            "B1: All other undergraduates enrolled in credit courses Men",
          ),
        all_other_undergraduates_enrolled_in_credit_courses_women: z
          .number()
          .describe(
            "B1: All other undergraduates enrolled in credit courses Women",
          ),
        all_other_undergraduates_enrolled_in_credit_courses_another_gender: z
          .number()
          .describe(
            "B1: All other undergraduates enrolled in credit courses Another Gender",
          ),
        all_other_undergraduates_enrolled_in_credit_courses_unknown: z
          .number()
          .describe(
            "B1: All other undergraduates enrolled in credit courses Unknown",
          ),
        total_undergraduate_full_time_students_men: z
          .number()
          .describe("B1: Total undergraduate Full-Time Students Men"),
        total_undergraduate_full_time_students_women: z
          .number()
          .describe("B1: Total undergraduate Full-Time Students Women"),
        total_undergraduate_full_time_students_another_gender: z
          .number()
          .describe(
            "B1: Total undergraduate Full-Time Students Another Gender",
          ),
        total_undergraduate_full_time_students_unknown: z
          .number()
          .describe("B1: Total undergraduate Full-Time Students Unknown"),
      })
      .describe("B1: Undergraduate Students: Full-Time"),
    undergraduate_students_part_time: z
      .object({
        degree_seeking_first_time_first_year_men: z
          .number()
          .describe("B1: Degree-seeking, first-time first-year students Men"),
        degree_seeking_first_time_first_year_women: z
          .number()
          .describe("B1: Degree-seeking, first-time first-year students Women"),
        degree_seeking_first_time_first_year_another_gender: z
          .number()
          .describe(
            "B1: Degree-seeking, first-time first-year students Another Gender",
          ),
        degree_seeking_first_time_first_year_unknown: z
          .number()
          .describe(
            "B1: Degree-seeking, first-time first-year students Unknown",
          ),
        other_first_year_degree_seeking_men: z
          .number()
          .describe("B1: Other first-year, degree-seeking Men"),
        other_first_year_degree_seeking_women: z
          .number()
          .describe("B1: Other first-year, degree-seeking Women"),
        other_first_year_degree_seeking_another_gender: z
          .number()
          .describe("B1: Other first-year, degree-seeking Another Gender"),
        other_first_year_degree_seeking_unknown: z
          .number()
          .describe("B1: Other first-year, degree-seeking Unknown"),
        all_other_degree_seeking_men: z
          .number()
          .describe("B1: All other degree-seeking Men"),
        all_other_degree_seeking_women: z
          .number()
          .describe("B1: All other degree-seeking Women"),
        all_other_degree_seeking_another_gender: z
          .number()
          .describe("B1: All other degree-seeking Another Gender"),
        all_other_degree_seeking_unknown: z
          .number()
          .describe("B1: All other degree-seeking Unknown"),
        total_degree_seeking_men: z
          .number()
          .describe("B1: Total degree-seeking Men"),
        total_degree_seeking_women: z
          .number()
          .describe("B1: Total degree-seeking Women"),
        total_degree_seeking_another_gender: z
          .number()
          .describe("B1: Total degree-seeking Another Gender"),
        total_degree_seeking_unknown: z
          .number()
          .describe("B1: Total degree-seeking Unknown"),
        all_other_undergraduates_enrolled_in_credit_courses_men: z
          .number()
          .describe(
            "B1: All other undergraduates enrolled in credit courses Men",
          ),
        all_other_undergraduates_enrolled_in_credit_courses_women: z
          .number()
          .describe(
            "B1: All other undergraduates enrolled in credit courses Women",
          ),
        all_other_undergraduates_enrolled_in_credit_courses_another_gender: z
          .number()
          .describe(
            "B1: All other undergraduates enrolled in credit courses Another Gender",
          ),
        all_other_undergraduates_enrolled_in_credit_courses_unknown: z
          .number()
          .describe(
            "B1: All other undergraduates enrolled in credit courses Unknown",
          ),
        total_undergraduate_part_time_students_men: z
          .number()
          .describe("B1: Total undergraduate Part-Time Students Men"),
        total_undergraduate_part_time_students_women: z
          .number()
          .describe("B1: Total undergraduate Part-Time Students Women"),
        total_undergraduate_part_time_students_another_gender: z
          .number()
          .describe(
            "B1: Total undergraduate Part-Time Students Another Gender",
          ),
        total_undergraduate_part_time_students_unknown: z
          .number()
          .describe("B1: Total undergraduate Part-Time Students Unknown"),
      })
      .describe("B1: Undergraduate Students: Part-Time"),
    undergraduate_students_all: z
      .object({
        total_undergraduate_students_men: z
          .number()
          .describe("B1: Total undergraduate Students Men"),
        total_undergraduate_students_women: z
          .number()
          .describe("B1: Total undergraduate Students Women"),
        total_undergraduate_students_another_gender: z
          .number()
          .describe("B1: Total undergraduate Students Another Gender"),
        total_undergraduate_students_unknown: z
          .number()
          .describe("B1: Total undergraduate Students Unknown"),
      })
      .describe("B1: Undergraduate Students: All"),
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
      responseJsonSchema: zodToJsonSchema(responseSchema),
      cachedContent: cache.name,
    },
  });

  if (!response.text) {
    throw new Error("No response text");
  }

  const rawResponse = JSON.parse(response.text);
  console.log(rawResponse);
  const responseJson = responseSchema.parse(rawResponse);

  await fs.writeFile(
    path.join(__dirname, "..", "example", "response.json"),
    JSON.stringify(responseJson, null, 2),
  );

  if (!response.usageMetadata) {
    throw new Error("No usage metadata");
  }

  const {
    promptTokenCount,
    candidatesTokenCount,
    cachedContentTokenCount,
    totalTokenCount,
    thoughtsTokenCount,
    toolUsePromptTokenCount,
  } = response.usageMetadata;

  // Input cost: $0.50 per million tokens
  // Output cost: $3.00 per million tokens
  // Context caching: $0.05 (text / image / video)
  // Context caching $1.00 / 1,000,000 tokens per hour (storage price)

  // Calculate how much of the prompt was not cached (new/uncached tokens)
  const newPromptTokenCount =
    (promptTokenCount ?? 0) - (cachedContentTokenCount ?? 0);

  // Charged at prompt rate
  const promptCost = ((newPromptTokenCount ?? 0) / 1_000_000) * 0.5;
  // Charged at output rate
  const candidatesCost = ((candidatesTokenCount ?? 0) / 1_000_000) * 3.0;
  // Charged at output rate
  const thoughtsCost = ((thoughtsTokenCount ?? 0) / 1_000_000) * 3.0;
  // Charged at context caching rate (discounted)
  const cachedCost = ((cachedContentTokenCount ?? 0) / 1_000_000) * 0.05;

  // Total cost
  const totalCost = promptCost + candidatesCost + thoughtsCost + cachedCost;

  console.log(`Prompt cost: $${promptCost.toFixed(6)}`);
  console.log(`Candidates cost: $${candidatesCost.toFixed(6)}`);
  console.log(`Thoughts cost: $${thoughtsCost.toFixed(6)}`);
  console.log(`Cached cost: $${cachedCost.toFixed(6)}`);
  console.log(`Total cost: $${totalCost.toFixed(6)}`);
})();

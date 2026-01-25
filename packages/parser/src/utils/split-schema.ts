import z from "zod/v3";

/**
 * Splits a Zod object schema into an array of smaller Zod objects,
 * where each has no more than maxFields fields (including nested fields).
 * Nested objects are never split and are always kept intact.
 */
export const splitSchema = (schema: z.ZodObject<any>, maxFields: number = 100): z.ZodObject<any>[] => {
  const fields = Object.keys(schema.shape);

  const result: z.ZodObject<any>[] = [];
  let currentChunk: Record<string, z.ZodTypeAny> = {};
  let currentCount = 0;

  for (const field of fields) {
    const val = schema.shape[field];

    // Calculate how many fields this would contribute
    let fieldCount = 1; // The field itself
    if (val instanceof z.ZodObject && "shape" in val) {
      fieldCount += Object.keys(val.shape).length; // Plus nested fields
    }

    // If adding this field would exceed the limit, start a new chunk
    if (currentCount + fieldCount > maxFields && currentCount > 0) {
      result.push(z.object(currentChunk));
      currentChunk = {};
      currentCount = 0;
    }

    // Add the field to the current chunk
    currentChunk[field] = val;
    currentCount += fieldCount;
  }

  // Push the final chunk if it has any fields
  if (Object.keys(currentChunk).length > 0) {
    result.push(z.object(currentChunk));
  }

  return result;
};

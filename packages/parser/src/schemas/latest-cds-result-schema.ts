import z from "zod/v3";

export const LatestCDSResultSchema = z.object({
  key: z.string(),
  filename: z.string().nullable(),
  url: z.string().nullable(),
  status: z.enum(["success", "manual", "failed"]),
  year: z.number().nullable().optional(),
});

export type LatestCDSResult = z.infer<typeof LatestCDSResultSchema>;

export const LatestCDSResultFileSchema = z.record(z.string(), LatestCDSResultSchema);

export type LatestCDSResultFile = z.infer<typeof LatestCDSResultFileSchema>;

import dotenv from "dotenv";
import path from "path";
import { z, ZodError } from "zod";

dotenv.config({ path: path.join(process.cwd(), "./.env") });

const envVarsSchema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"]),
  GEMINI_API_KEY: z.string(),
});

let envVars: z.infer<typeof envVarsSchema>;

try {
  envVars = envVarsSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    throw new Error(`Config validation error: ${error.message}`);
  } else {
    throw error;
  }
}

export const env = {
  ...envVars,
};

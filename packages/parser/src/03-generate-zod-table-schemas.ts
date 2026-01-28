import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import z from "zod/v3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputSchema = z.object({
  key_names: z.array(
    z.object({
      name: z.string().describe("The name of the key combining the column and row heading, e.g. (number_of_ftfy_students_awarded_aid)"),
      type: z.enum(["number", "string", "boolean"]).describe("The type of the value, e.g. number, string, boolean"),
      units: z.enum(["unitless", "percentage", "dollars"]).nullable().describe("The units of the value, e.g. unitless, percentage, dollars"),
      description: z.string().describe("The column and row heading separated by a pipe, e.g. (First-time Full-time First-year Students | Number of degree-seeking undergraduate students (CDS Item B1 if reporting on Fall 2024 cohort))"),
    }),
  ),
});

const tableName = "H2";

(async () => {
  const rawTableData = await fs.readFile(path.join(__dirname, "..", "example", `response-test2.json`), "utf8");
  const tableData = JSON.parse(rawTableData) as z.infer<typeof inputSchema>;

  let output = [];

  for (const { description, name, type, units } of tableData.key_names) {
    let descriptionString = `${tableName}: ${description}`;
    let additionalTypes = "";

    if (type === "number") {
      switch (units) {
        case "dollars":
          descriptionString = `${tableName}: ${descriptionString} (in dollars)`;
          break;
        case "percentage":
          descriptionString = `${tableName}: ${descriptionString} (as percentage from 0% to 100%)`;
          additionalTypes = ".min(0).max(100)";
          break;
        case "unitless":
        default:
          break;
      }
    } else if (type === "string") {
    } else if (type === "boolean") {
    } else {
      throw new Error(`Invalid type: ${type}`);
    }

    const schemaString = `${name}: z.number().optional()${additionalTypes}.describe("${descriptionString}")`;
    output.push(schemaString);
  }

  await fs.writeFile(path.join(__dirname, "..", "example", `zod-table-schemas-${tableName}.ts`), output.join("\n"));
})();

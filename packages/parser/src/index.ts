/**
 * 1. Run `pnpm run tui` to start the TUI
 * 2. Run `pnpm run parse` to parse the results
 */
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import * as readline from "readline";
import chalk from "chalk";
import { LatestCDSResultFileSchema } from "./schemas/latest-cds-result-schema.ts";
import { logger } from "./config/logger.ts";
import { parseCDS } from "./core/parse-cds.ts";
import mime from "mime-types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Progress tracking types
interface ProgressData {
  timestamp: number;
  sourceFile: string;
  completed: string[];
  skipped: string[];
}

// Helper to ask user a question
const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    if (process.stdin.isPaused()) {
      process.stdin.resume();
    }

    let resolved = false;

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
    });

    rl.question(question, (answer) => {
      if (!resolved) {
        resolved = true;
        rl.close();
        resolve(answer.trim().toLowerCase());
      }
    });

    rl.on("close", () => {
      if (!resolved) {
        resolved = true;
        resolve("");
      }
    });
  });
};

// Find latest progress file
const findLatestProgressFile = async (progressDir: string): Promise<{ filename: string; data: ProgressData } | null> => {
  try {
    await fs.mkdir(progressDir, { recursive: true });
    const files = await fs.readdir(progressDir);
    const progressFiles = files.filter((f) => f.startsWith("progress-") && f.endsWith(".json")).sort((a, b) => b.localeCompare(a));

    if (progressFiles.length === 0) return null;

    const latestFile = progressFiles[0]!;
    const data = JSON.parse(await fs.readFile(path.join(progressDir, latestFile), "utf-8")) as ProgressData;
    return { filename: latestFile, data };
  } catch {
    return null;
  }
};

// Save progress
const saveProgress = async (progressDir: string, progressFile: string, data: ProgressData): Promise<void> => {
  await fs.mkdir(progressDir, { recursive: true });
  await fs.writeFile(path.join(progressDir, progressFile), JSON.stringify(data, null, 2));
};

// Print header
const printHeader = () => {
  console.log("\n");
  console.log(chalk.cyan.bold("╔════════════════════════════════════════════════════════════╗"));
  console.log(chalk.cyan.bold("║") + chalk.white.bold("           📄 CDS Parser - Progress Tracker 📄              ") + chalk.cyan.bold("║"));
  console.log(chalk.cyan.bold("╚════════════════════════════════════════════════════════════╝"));
  console.log("\n");
};

const main = async () => {
  printHeader();

  const dataDir = path.join(__dirname, "..", "data");
  const resultsDir = path.join(dataDir, "results");
  const progressDir = path.join(dataDir, "progress");

  // Get latest results file
  const resultsFiles = await fs.readdir(resultsDir);
  const latestResultsFile = resultsFiles.filter((f) => f.endsWith(".json")).sort((a, b) => b.localeCompare(a))[0];
  if (!latestResultsFile) {
    console.log(chalk.red("❌ No results found. Try running `pnpm run tui` first."));
    process.exit(1);
  }

  console.log(chalk.dim(`Using results file: ${latestResultsFile}\n`));

  const latestResults = LatestCDSResultFileSchema.parse(JSON.parse(await fs.readFile(path.join(resultsDir, latestResultsFile), "utf-8")));
  const allKeys = Object.keys(latestResults);

  // Check for existing progress
  let progressData: ProgressData;
  let progressFile: string;
  const existingProgress = await findLatestProgressFile(progressDir);

  if (existingProgress && existingProgress.data.completed.length > 0) {
    const { filename, data } = existingProgress;
    const completedCount = data.completed.length;
    const remainingCount = allKeys.length - completedCount;

    // Find next key to process
    const nextKey = allKeys.find((k) => !data.completed.includes(k) && !data.skipped.includes(k));

    console.log(chalk.yellow("📋 Found existing progress:"));
    console.log(chalk.dim(`   File: ${filename}`));
    console.log(chalk.dim(`   Started: ${new Date(data.timestamp).toLocaleString()}`));
    console.log(chalk.green(`   ✅ Completed: ${completedCount}/${allKeys.length}`));
    console.log(chalk.cyan(`   📍 Next: ${nextKey ?? "None remaining"}`));

    if (completedCount > 0) {
      const recentCompleted = data.completed.slice(-5);
      console.log(chalk.dim(`   Recent: ${recentCompleted.join(", ")}${data.completed.length > 5 ? "..." : ""}`));
    }

    console.log("\n");
    const answer = await askQuestion(chalk.cyan("Continue from existing progress? (y/n): "));

    if (answer === "y" || answer === "yes") {
      console.log(chalk.green("\n✓ Continuing from existing progress...\n"));
      progressData = data;
      progressFile = filename;
    } else {
      console.log(chalk.yellow("\n→ Starting fresh...\n"));
      const timestamp = new Date().getTime();
      progressFile = `progress-${timestamp}.json`;
      progressData = {
        timestamp,
        sourceFile: latestResultsFile,
        completed: [],
        skipped: [],
      };
    }
  } else {
    console.log(chalk.dim("No existing progress found. Starting fresh...\n"));
    const timestamp = new Date().getTime();
    progressFile = `progress-${timestamp}.json`;
    progressData = {
      timestamp,
      sourceFile: latestResultsFile,
      completed: [],
      skipped: [],
    };
  }

  // Save initial progress file
  await saveProgress(progressDir, progressFile, progressData);

  // Parse each result
  let processed = 0;
  let skipped = 0;

  for (const [key, value] of Object.entries(latestResults)) {
    // Skip if already completed
    if (progressData.completed.includes(key)) {
      continue;
    }

    const { filename, status } = value;
    const displayName = key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const progress = chalk.dim(`[${progressData.completed.length + 1}/${allKeys.length}]`);

    console.log(chalk.cyan.bold(`\n${progress} ${displayName}`));

    // Check for skip conditions
    let skipReason: string | null = null;

    if (status === "failed") {
      skipReason = "status is failed";
    } else if (!filename) {
      skipReason = "no filename";
    } else {
      const filepath = path.join(dataDir, "cds-files", filename);
      const fileExists = await fs
        .access(filepath)
        .then(() => true)
        .catch(() => false);

      if (!fileExists) {
        skipReason = "file does not exist";
      } else {
        const mimeType = mime.lookup(filepath);
        if (!mimeType) {
          skipReason = "unable to determine mime type";
        } else if (mimeType !== "application/pdf") {
          skipReason = `not a PDF (${mimeType})`;
        }
      }
    }

    if (skipReason) {
      console.log(chalk.yellow(`   ⏭️  Skipping: ${skipReason}`));
      progressData.skipped.push(key);
      await saveProgress(progressDir, progressFile, progressData);
      skipped++;
      continue;
    }

    // Process the file
    const filepath = path.join(dataDir, "cds-files", filename!);
    const mimeType = mime.lookup(filepath) as string;

    console.log(chalk.dim(`   File: ${filename}`));

    try {
      logger.info(`Parsing ${key} with file ${filepath} and mime type ${mimeType}`);
      await parseCDS(key, filename!, filepath, mimeType);

      // Mark as completed
      progressData.completed.push(key);
      await saveProgress(progressDir, progressFile, progressData);
      processed++;

      console.log(chalk.green(`   ✅ Completed`));
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      console.log(chalk.red(`   ❌ Error: ${errorMsg}`));
      logger.error(`Error parsing ${key}:`, { error });

      // Still save progress so we know where we failed
      await saveProgress(progressDir, progressFile, progressData);

      // Ask if user wants to continue
      const answer = await askQuestion(chalk.yellow("\n   Continue to next? (y/n): "));
      if (answer !== "y" && answer !== "yes") {
        console.log(chalk.yellow("\n👋 Stopping. Progress saved.\n"));
        break;
      }
    }
  }

  // Print summary
  console.log("\n");
  console.log(chalk.cyan.bold("═══════════════════════════════════════════════════════════════"));
  console.log(chalk.white.bold("                         📊 Summary                            "));
  console.log(chalk.cyan.bold("═══════════════════════════════════════════════════════════════"));
  console.log(chalk.green(`  ✅ Processed this run:  ${processed}`));
  console.log(chalk.yellow(`  ⏭️  Skipped this run:    ${skipped}`));
  console.log(chalk.cyan(`  📁 Total completed:     ${progressData.completed.length}/${allKeys.length}`));
  console.log(chalk.dim(`  📄 Progress file:       ${progressFile}`));
  console.log(chalk.cyan.bold("═══════════════════════════════════════════════════════════════\n"));

  console.log(chalk.green.bold("✨ Done!\n"));
};

(async () => {
  try {
    await main();
  } catch (error) {
    console.error(chalk.red.bold("\n💥 Fatal error:"), error);
    process.exit(1);
  }
})();

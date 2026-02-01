import chalk from "chalk";
import ora from "ora";
import * as readline from "readline";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { cdsPages } from "@/data/cds-pages.ts";
import { getLatestCDSLink } from "@/core/get-latest-cds.ts";
import { downloadDriveFile } from "@/utils/download-drive-file.ts";
import type { LatestCDSResult, LatestCDSResultFile } from "@/schemas/latest-cds-result-schema.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, "..", "data", "cds-files");
const RESULTS_DIR = path.join(__dirname, "..", "data", "results");

// Helper to ask user a question (creates fresh readline each time to avoid stdin issues with Puppeteer)
const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    // Ensure stdin is in the right state
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
        resolve(answer.trim());
      }
    });

    // Handle close event (e.g., if user presses Ctrl+D)
    rl.on("close", () => {
      if (!resolved) {
        resolved = true;
        resolve("");
      }
    });
  });
};

// Download a PDF from URL
const downloadPdf = async (url: string, key: string): Promise<string> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  const isHtml = contentType.includes("text/html");

  // Extract filename from URL or generate one
  let filename: string;
  if (isHtml) {
    filename = `${key}.html`;
  } else {
    const urlPath = new URL(url).pathname;
    const urlFilename = urlPath.split("/").pop();
    if (urlFilename && urlFilename.includes(".")) {
      filename = `${key}_${urlFilename}`;
    } else {
      filename = `${key}.pdf`;
    }
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const outputPath = path.join(OUTPUT_DIR, filename);

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(outputPath, buffer);

  return filename;
};

// Download file based on URL type
const downloadFile = async (url: string, key: string): Promise<string> => {
  if (url.includes("drive.google.com")) {
    const filepath = await downloadDriveFile(url, OUTPUT_DIR);
    return path.basename(filepath);
  } else {
    return await downloadPdf(url, key);
  }
};

// Save results to timestamped JSON
const saveResults = async (results: LatestCDSResult[]): Promise<string> => {
  await fs.mkdir(RESULTS_DIR, { recursive: true });

  const timestamp = new Date().getTime();
  const filename = `cds-download-results-${timestamp}.json`;
  const filepath = path.join(RESULTS_DIR, filename);

  // Create mapping object
  const mapping: LatestCDSResultFile = {};
  for (const result of results) {
    mapping[result.key] = {
      key: result.key,
      filename: result.filename,
      url: result.url,
      status: result.status,
      year: result.year,
    };
  }

  await fs.writeFile(filepath, JSON.stringify(mapping, null, 2));
  return filepath;
};

// Print header
const printHeader = () => {
  console.log("\n");
  console.log(chalk.cyan.bold("╔════════════════════════════════════════════════════════════╗"));
  console.log(chalk.cyan.bold("║") + chalk.white.bold("      📚 Common Data Set (CDS) File Downloader 📚           ") + chalk.cyan.bold("║"));
  console.log(chalk.cyan.bold("╚════════════════════════════════════════════════════════════╝"));
  console.log("\n");
};

// Print summary
const printSummary = (results: LatestCDSResult[]) => {
  const successful = results.filter((r) => r.status === "success").length;
  const manual = results.filter((r) => r.status === "manual").length;
  const failed = results.filter((r) => r.status === "failed").length;

  console.log("\n");
  console.log(chalk.cyan.bold("═══════════════════════════════════════════════════════════════"));
  console.log(chalk.white.bold("                         📊 Summary                            "));
  console.log(chalk.cyan.bold("═══════════════════════════════════════════════════════════════"));
  console.log(chalk.green(`  ✅ Successful:     ${successful}`));
  console.log(chalk.yellow(`  👤 Manual input:   ${manual}`));
  console.log(chalk.red(`  ❌ Failed:         ${failed}`));
  console.log(chalk.cyan(`  📁 Total:          ${results.length}`));
  console.log(chalk.cyan.bold("═══════════════════════════════════════════════════════════════\n"));
};

// Main TUI function
const main = async () => {
  printHeader();

  const results: LatestCDSResult[] = [];
  const entries = Object.entries(cdsPages);

  console.log(chalk.dim(`Found ${entries.length} universities to process.\n`));

  for (let i = 0; i < entries.length; i++) {
    const [key, homepageUrl] = entries[i]!;
    const displayName = key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const progress = chalk.dim(`[${i + 1}/${entries.length}]`);

    console.log(chalk.cyan.bold(`\n${progress} ${displayName}`));
    console.log(chalk.dim(`   Homepage: ${homepageUrl}`));

    // Step 1: Try to automatically find the CDS link
    const scrapeSpinner = ora({
      text: chalk.dim("Searching for latest CDS file..."),
      color: "cyan",
    }).start();

    let cdsLink: { url: string; year: number; text: string } | false = false;

    try {
      cdsLink = await getLatestCDSLink(key, homepageUrl);
    } catch (error) {
      scrapeSpinner.fail(chalk.red("Error during scrape"));
    }

    if (cdsLink) {
      scrapeSpinner.succeed(chalk.green(`Found: ${cdsLink.text} (${cdsLink.year})`));
      console.log(chalk.dim(`   URL: ${cdsLink.url}`));

      // Step 2: Try to download the file
      const downloadSpinner = ora({
        text: chalk.dim("Downloading file..."),
        color: "cyan",
      }).start();

      try {
        const filename = await downloadFile(cdsLink.url, key);
        downloadSpinner.succeed(chalk.green(`Downloaded: ${filename}`));

        results.push({
          key,
          filename,
          url: cdsLink.url,
          status: "success",
          year: cdsLink.year,
        });
        continue;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        downloadSpinner.fail(chalk.yellow(`Download failed: ${errorMsg}`));
      }
    } else {
      scrapeSpinner.warn(chalk.yellow("Could not find CDS link automatically"));
    }

    // Step 3: Manual intervention required
    console.log(chalk.yellow("\n   ⚠️  Manual intervention required"));
    console.log(chalk.dim(`   Please visit: ${chalk.underline(homepageUrl)}`));
    console.log(chalk.dim("   Find the latest CDS file and paste the direct link below."));
    console.log(chalk.dim("   (Press Enter to skip, or type 'quit' to exit)\n"));

    const manualUrl = await askQuestion(chalk.cyan("   📎 Paste CDS file URL: "));

    if (manualUrl.toLowerCase() === "quit") {
      console.log(chalk.yellow("\n👋 Exiting early. Saving progress..."));
      break;
    }

    if (!manualUrl) {
      console.log(chalk.dim("   Skipped."));
      results.push({
        key,
        filename: null,
        url: cdsLink ? cdsLink.url : null,
        status: "failed",
        year: cdsLink ? cdsLink.year : undefined,
      });
      continue;
    }

    // Try to download the manually provided URL
    const manualDownloadSpinner = ora({
      text: chalk.dim("Downloading from manual URL..."),
      color: "cyan",
    }).start();

    try {
      const filename = await downloadFile(manualUrl, key);
      manualDownloadSpinner.succeed(chalk.green(`Downloaded: ${filename}`));

      results.push({
        key,
        filename,
        url: manualUrl,
        status: "manual",
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      manualDownloadSpinner.fail(chalk.red(`Download failed: ${errorMsg}`));

      // Save URL even if download failed
      results.push({
        key,
        filename: null,
        url: manualUrl,
        status: "failed",
      });
    }
  }

  // Save results
  const saveSpinner = ora({
    text: chalk.dim("Saving results..."),
    color: "cyan",
  }).start();

  try {
    const resultsPath = await saveResults(results);
    saveSpinner.succeed(chalk.green(`Results saved to: ${resultsPath}`));
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    saveSpinner.fail(chalk.red(`Failed to save results: ${errorMsg}`));
  }

  // Print summary
  printSummary(results);

  console.log(chalk.green.bold("✨ Done!"));
  console.log(chalk.dim(`   Files saved to: ${OUTPUT_DIR}`));
  console.log("\n");

  process.exit(0);
};

// Run
main().catch((error) => {
  console.error(chalk.red.bold("\n💥 Fatal error:"), error);
  process.exit(1);
});

import puppeteer from "puppeteer";
import { logger } from "@/config/logger.ts";

export const getLatestCDSLink = async (key: string, value: string) => {
  const browser = await puppeteer.launch();
  try {
    logger.info(`Finding latest CDS file for ${key}...`);
    const page = await browser.newPage();

    // Go to URL
    await page.goto(value);

    // Set screen size.
    await page.setViewport({ width: 1080, height: 1024 });

    // Find all links and extract href + text
    const allLinks = await page.$$eval("a", (anchors) =>
      anchors.map((a) => ({
        href: a.href,
        text: a.textContent?.trim() ?? "",
      })),
    );

    // Filter for link text that has "CDS" or "Common Data Set"
    // const cdsLinks = allLinks.filter((link) => link.text.includes("CDS") || link.text.includes("Common Data Set"));

    // if (cdsLinks.length === 0) {
    //   logger.warn(`No CDS links found for ${key}`, {
    //     allLinks,
    //   });
    //   await browser.close();
    //   return false;
    // }

    // For each link, extract any year-specific text (e.g. "2024-2025", "2024-25", "2024")
    const yearPatterns = [
      /(\d{4})-(\d{4})/, // 2024-2025
      /(\d{4})-(\d{2})/, // 2024-25
      /(\d{4})/, // 2024
    ];

    const linksWithYears = allLinks
      .map((link) => {
        const combinedText = `${link.text} ${link.href}`;
        for (const pattern of yearPatterns) {
          const match = combinedText.match(pattern);
          if (match?.[1]) {
            // Normalize to get the start year
            const startYear = parseInt(match[1], 10);
            return { ...link, year: startYear };
          }
        }
        return { ...link, year: 0 };
      })
      .filter((link) => link.year > 0);

    if (linksWithYears.length === 0) {
      logger.warn(`No year-specific CDS links found for ${key}`);
      await browser.close();
      return false;
    }

    const cdsLinks = linksWithYears.filter((link) => {
      if (link.text.includes("CDS") || link.text.includes("Common Data Set")) {
        return true;
      } else if (link.href.endsWith(".pdf") || link.href.includes("drive.google.com") || link.href.includes("box.com")) {
        return true;
      }
      return false;
    });

    // Sort to find the latest year-specific link (descending by year)
    cdsLinks.sort((a, b) => b.year - a.year);

    // Get the link and validate it with isValidCDSLink
    const latestLink = cdsLinks[0];

    if (!latestLink) {
      logger.warn(`No valid CDS link found for ${key} (checked ${linksWithYears.length} links)`, {
        linksWithYears,
      });
      await browser.close();
      return false;
    }

    logger.info(`Found CDS link for ${key}: ${latestLink.href} (year: ${latestLink.year})`);

    await browser.close();

    return {
      url: latestLink.href,
      year: latestLink.year,
      text: latestLink.text,
    };
  } catch (error) {
    logger.error(`Error finding latest CDS file for ${key}`, {
      error,
    });
    return false;
  } finally {
    await browser.close();
  }
};

import path from "path";
import fs from "fs/promises";

export const downloadDriveFile = async (url: string, dirPath: string): Promise<string> => {
  const fileIdPattern = /file\/d\/([^\/]+)/;
  const fileId = fileIdPattern.exec(url)?.[1];
  if (!fileId) {
    throw new Error("No file ID found in URL");
  }

  // Get file name from page metadata
  const response = await fetch(`https://drive.google.com/file/d/${fileId}/view`);
  const text = await response.text();
  const title = text.match(/<meta property="og:title" content="([^"]*)"/)?.[1];
  if (!title) {
    throw new Error("No title found in URL");
  }

  if (!title.endsWith(".pdf")) {
    throw new Error("File is not a PDF");
  }

  // Download file
  const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  const outputFilepath = path.join(dirPath, title);

  // Ensure directory exists
  await fs.mkdir(dirPath, { recursive: true });

  // Fetch and save the file
  const downloadResponse = await fetch(downloadUrl);
  if (!downloadResponse.ok) {
    throw new Error(`Failed to download file: ${downloadResponse.status} ${downloadResponse.statusText}`);
  }

  const arrayBuffer = await downloadResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await fs.writeFile(outputFilepath, buffer);

  return outputFilepath;
};

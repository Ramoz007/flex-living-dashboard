import fs from "fs";
import path from "path";

/**
 * Reads and parses mock JSON data from a local file.
 *
 * @param {string} filePath - Relative or absolute path to the JSON file.
 * @returns {any} The parsed JSON object.
 * @throws Will throw an error if the JSON structure is invalid (missing `result` array).
 */
export const parseMockData = (filePath: string): any => {
  const fullPath = path.resolve(filePath);
  const raw = fs.readFileSync(fullPath, "utf-8");
  const data = JSON.parse(raw);
  if (!data.result || !Array.isArray(data.result)) {
    throw new Error("Invalid review JSON structure");
  }
  return data;
};

/**
 * Determines whether an HTTP response status code indicates a successful request.
 *
 * @param {number} status - The HTTP status code to evaluate.
 * @returns {boolean} True if the status code is in the 200–299 range, false otherwise.
 */
export const isRequestSuccess = (status: number): boolean => status >= 200 && status < 300;

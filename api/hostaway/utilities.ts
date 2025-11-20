/**
 * Determines whether an HTTP response status code indicates a successful request.
 *
 * @param {number} status - The HTTP status code to evaluate.
 * @returns {boolean} True if the status code is in the 200–299 range, false otherwise.
 */
export const isRequestSuccess = (status: number): boolean => status >= 200 && status < 300;

import { FetchOptions } from "@/api/hostaway/types";
import { VARIABLES } from "@/utilities/constants/general";

export class HostawayApiService {
  /**
   * Performs an HTTP request to the specified Hostaway API endpoint.
   *
   * @param {string} endpoint - The API endpoint to call (e.g., "/reviews").
   * @param {FetchOptions} options - Optional fetch options including method, headers, and request body data.
   * @returns {Promise<Response>} A Promise that resolves to the raw fetch Response object.
   */
  protected async fetch(endpoint: string, options: FetchOptions = {}): Promise<Response> {
    const { data, ...fetchOptions } = options;
    const config: RequestInit = {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    };
    if (data) {
      config.body = JSON.stringify(data);
    }
    const url = `${VARIABLES.hostawayApiBaseUrl}${endpoint}`;
    return fetch(url, config);
  }
}

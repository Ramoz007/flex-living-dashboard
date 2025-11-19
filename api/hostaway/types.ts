/**
 * Represents the basic structure of a service response.
 */
export interface BasicServiceResponse {
  success: boolean;
  message: string;
}

/**
 * Extends BasicServiceResponse to include data returned from the service.
 *
 * @template T - Type of the data returned (e.g., Review[], etc.)
 */
export interface DataServiceResponse<T> extends BasicServiceResponse {
  data?: T | null;
}

/**
 * Represents options for making an HTTP request using HostawayApiService.
 * Extends the native RequestInit type with a `data` property for request body payload.
 */
export interface FetchOptions extends RequestInit {
  data?: any;
}

/**
 * Enum of Hostaway API endpoints for type safety and clarity.
 */
export enum ApiEndpoint {
  REVIEWS = "/reviews",
}

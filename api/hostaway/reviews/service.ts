import {
  GetReviewsResponseApi,
  NormalizedProperty,
  NormalizedReview,
  Review,
} from "@/api/hostaway/reviews/types";
import {
  normalizePropertiesReviews,
  normalizePropertyReviews,
  normalizeReviewData,
  parseReviewData,
} from "@/api/hostaway/reviews/utilities";
import { mockReviewsData } from "../mockData/mockData";
import { isRequestSuccess } from "@/api/hostaway/utilities";
import { HostawayApiService } from "@/api/hostaway/service";
import { ApiEndpoint, DataServiceResponse } from "@/api/hostaway/types";

interface GetReviewsProps {
  isMocked?: boolean;
}

interface GetOnePropertyReviewsProps {
  isMocked?: boolean;
  propertyId: string;
}

interface GetManyPropertyReviewsProps {
  isMocked?: boolean;
}

export class ReviewsService extends HostawayApiService {
  /**
   * Fetches reviews from the Hostaway API or mock data.
   *
   * @param {GetReviewsProps} params - Parameters for fetching reviews.
   * @param {boolean} params.isMocked - Whether to fetch mock data instead of real API data (default: true).
   * @returns {Promise<DataServiceResponse<Review[] | null>>}
   *          Returns a response object containing a success flag, message, and list of reviews or null.
   */
  async getReviews({
    isMocked = true,
  }: GetReviewsProps): Promise<DataServiceResponse<Review[] | null>> {
    if (!isMocked) {
      // Fetch real reviews from the API
      const endpoint = ApiEndpoint.REVIEWS;
      const response = await this.fetch(endpoint, { method: "GET" });
      if (isRequestSuccess(response.status)) {
        const data: GetReviewsResponseApi = await response.json();
        if (Array.isArray(data.result)) {
          return {
            success: true,
            message: `Reviews fetched successfully.`,
            data: data.result,
          };
        }
      }
      return {
        success: false,
        message: `Failed to fetch reviews.`,
        data: null,
      };
    }
    const parsedReviews = parseReviewData(mockReviewsData.result);
    return {
      success: true,
      message: `Reviews fetched successfully.`,
      data: parsedReviews,
    };
  }

  /**
   * Fetches reviews and returns them in a normalized format.
   *
   * Normalized reviews transform the raw API or mock data into a structured format
   * that is easier to use for analytics, dashboards, or aggregations.
   *
   * @param {GetReviewsProps} params - Parameters for fetching reviews.
   * @param {boolean} params.isMocked - Whether to fetch mock data instead of real API data (default: true).
   * @returns {Promise<DataServiceResponse<NormalizedReview[] | null>>}
   *          Returns a response object containing a success flag, message, and list of normalized reviews or null.
   */
  async getNormalizedReviews({
    isMocked = true,
  }: GetReviewsProps): Promise<DataServiceResponse<NormalizedReview[] | null>> {
    if (!isMocked) {
      // Fetch real reviews from the API
      const endpoint = ApiEndpoint.REVIEWS;
      const response = await this.fetch(endpoint, { method: "GET" });
      if (isRequestSuccess(response.status)) {
        const data: GetReviewsResponseApi = await response.json();
        if (Array.isArray(data.result)) {
          const normalizedReviews = normalizeReviewData(data.result);
          return {
            success: true,
            message: `Reviews fetched successfully.`,
            data: normalizedReviews,
          };
        }
      }
      return {
        success: false,
        message: `Failed to fetch reviews.`,
        data: null,
      };
    }
    const normalizedReviews = normalizeReviewData(mockReviewsData.result);
    return {
      success: true,
      message: `Reviews fetched successfully.`,
      data: normalizedReviews,
    };
  }

  // Property Reviews (One)

  async getOnePropertyReviews({
    propertyId,
    isMocked = true,
  }: GetOnePropertyReviewsProps): Promise<DataServiceResponse<NormalizedProperty | null>> {
    if (!isMocked) {
      // Fetch real reviews from the API
      const endpoint = ApiEndpoint.REVIEWS;
      const response = await this.fetch(endpoint, { method: "GET" });
      if (isRequestSuccess(response.status)) {
        const data: GetReviewsResponseApi = await response.json();
        if (Array.isArray(data.result) && data.result.length > 0) {
          const propertyReviews = normalizePropertyReviews(propertyId, data.result);
          return {
            success: true,
            message: `Property reviews fetched successfully.`,
            data: propertyReviews,
          };
        }
      }
      return {
        success: false,
        message: `Failed to fetch property reviews.`,
        data: null,
      };
    } else {
      const propertyOneReviews = normalizePropertyReviews(propertyId, mockReviewsData.result);
      if (propertyOneReviews) {
        return {
          success: true,
          message: `Property reviews fetched successfully.`,
          data: propertyOneReviews,
        };
      }
      return {
        success: false,
        message: `Failed to fetch property reviews.`,
        data: null,
      };
    }
  }

  // Property Reviews (Many)

  async getManyPropertyReviews({
    isMocked = true,
  }: GetManyPropertyReviewsProps): Promise<DataServiceResponse<NormalizedProperty[] | null>> {
    if (!isMocked) {
      // Fetch real reviews from the API
      const endpoint = ApiEndpoint.REVIEWS;
      const response = await this.fetch(endpoint, { method: "GET" });
      if (isRequestSuccess(response.status)) {
        const data: GetReviewsResponseApi = await response.json();
        if (Array.isArray(data.result)) {
          const propertyReviews = normalizePropertiesReviews(data.result);
          return {
            success: true,
            message: `Properties reviews fetched successfully.`,
            data: propertyReviews,
          };
        }
      }
      return {
        success: false,
        message: `Failed to fetch properties reviews.`,
        data: null,
      };
    }
    const propertyReviews = normalizePropertiesReviews(mockReviewsData.result);
    return {
      success: true,
      message: `Properties reviews fetched successfully.`,
      data: propertyReviews,
    };
  }
}

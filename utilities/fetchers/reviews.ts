import {
  ReviewsRepsonse,
  NormalizedReviewsRepsonse,
  NormalizedPropertyRepsonse,
  NormalizedPropertiesRepsonse,
} from "@/api/hostaway/reviews/types";
import { ReviewsService } from "@/api/hostaway/reviews/service";

export const getManyReviewsFetcher = async (): Promise<ReviewsRepsonse> => {
  const reviewsService = new ReviewsService();
  const response = await reviewsService.getReviews({ isMocked: true });
  if (response.success) {
    return response;
  }
  throw new Error(response.message);
};

export const getManyNormalizedReviewsFetcher = async (): Promise<NormalizedReviewsRepsonse> => {
  const reviewsService = new ReviewsService();
  const response = await reviewsService.getNormalizedReviews({ isMocked: true });
  if (response.success) {
    return response;
  }
  throw new Error(response.message);
};

export const getPropertyReviewsFetcher = async (
  id: string
): Promise<NormalizedPropertyRepsonse> => {
  const reviewsService = new ReviewsService();
  const response = await reviewsService.getOnePropertyReviews({ propertyId: id, isMocked: true });
  if (response.success) {
    return response;
  }
  throw new Error(response.message);
};

export const getPropertiesReviewsFetcher = async (): Promise<NormalizedPropertiesRepsonse> => {
  const reviewsService = new ReviewsService();
  const response = await reviewsService.getManyPropertyReviews({ isMocked: true });
  if (response.success) {
    return response;
  }
  throw new Error(response.message);
};

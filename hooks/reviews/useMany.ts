"use client";

import useSWR from "swr";

import { ApiEndpoint } from "@/api/hostaway/types";
import { getManyReviewsFetcher } from "@/utilities/fetchers/reviews";
import { Review, ReviewsRepsonse } from "@/api/hostaway/reviews/types";

interface UseReviewsMany {
  isLoading: boolean;
  reviews?: Review[] | null;
}

export const useReviewsMany = (): UseReviewsMany => {
  const reviewsSwrUrl = ApiEndpoint.REVIEWS + "/reviews";
  const fetcher = (): Promise<ReviewsRepsonse> => getManyReviewsFetcher();
  const { data, isLoading, error } = useSWR(reviewsSwrUrl, fetcher);
  return {
    isLoading,
    reviews: data?.data || null,
  };
};

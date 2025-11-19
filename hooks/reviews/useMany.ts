import useSWR from "swr";
import { useEffect, useMemo } from "react";

import { ApiEndpoint } from "@/api/hostaway/types";
import { getManyReviewsFetcher } from "@/utilities/fetchers/reviews";
import { getErrorMessage } from "@/utilities/helpers/getErrorMessage";
import { Review, ReviewsRepsonse } from "@/api/hostaway/reviews/types";

interface UseReviewsMany {
  isLoading: boolean;
  reviews?: Review[] | null;
}

export const useReviewsMany = (): UseReviewsMany => {
  const reviewsSwrUrl = ApiEndpoint.REVIEWS;
  const fetcher = (): Promise<ReviewsRepsonse> => getManyReviewsFetcher();
  const { data, isLoading, error } = useSWR(reviewsSwrUrl, fetcher);

  const { reviews } = useMemo(() => {
    if (!data) {
      return { reviews: null };
    }
    return {
      reviews: data.data,
    };
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log({
        message: getErrorMessage(error),
        type: "error",
      });
    }
  }, [error]);

  return {
    isLoading,
    reviews,
  };
};

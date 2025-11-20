import useSWR from "swr";
import { useMemo } from "react";

import { ApiEndpoint } from "@/api/hostaway/types";
import { getManyNormalizedReviewsFetcher } from "@/utilities/fetchers/reviews";
import { NormalizedReview, NormalizedReviewsRepsonse } from "@/api/hostaway/reviews/types";

interface UseDashboardFilters {
  isLoading: boolean;
  channels?: string[] | null;
  categories?: string[] | null;
}

export const useDashboardFilters = (): UseDashboardFilters => {
  const reviewsSwrUrl = ApiEndpoint.REVIEWS + "/dashboard-filters";
  const fetcher = (): Promise<NormalizedReviewsRepsonse> => getManyNormalizedReviewsFetcher();
  const { data, isLoading } = useSWR(reviewsSwrUrl, fetcher);

  const { channels, categories } = useMemo(() => {
    if (!data || !data.data) {
      return { channels: null, categories: null };
    }
    // Extract unique channels
    const channels = Array.from(
      new Set(data.data.map((r: NormalizedReview) => r.status).filter(Boolean))
    );
    // Extract unique categories
    const categories = Array.from(
      new Set(data.data.flatMap((r: NormalizedReview) => r.categories ?? []))
    );
    return {
      channels: channels,
      categories: categories,
    };
  }, [data]);

  return {
    isLoading,
    channels,
    categories,
  };
};

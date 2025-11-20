"use client";

import useSWR from "swr";

import { ApiEndpoint } from "@/api/hostaway/types";
import { getPropertiesReviewsFetcher } from "@/utilities/fetchers/reviews";
import { NormalizedPropertiesRepsonse, NormalizedProperty } from "@/api/hostaway/reviews/types";

interface UsePropertiesMany {
  isLoading: boolean;
  properties?: NormalizedProperty[] | null;
}

export const usePropertiesMany = (): UsePropertiesMany => {
  const reviewsSwrUrl = ApiEndpoint.REVIEWS + "/properties";
  const fetcher = (): Promise<NormalizedPropertiesRepsonse> => getPropertiesReviewsFetcher();
  const { data, isLoading, error } = useSWR(reviewsSwrUrl, fetcher);
  return {
    isLoading,
    properties: data?.data || null,
  };
};

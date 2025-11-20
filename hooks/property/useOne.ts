"use client";

import useSWR from "swr";

import { ApiEndpoint } from "@/api/hostaway/types";
import { getPropertyReviewsFetcher } from "@/utilities/fetchers/reviews";
import { NormalizedProperty, NormalizedPropertyRepsonse } from "@/api/hostaway/reviews/types";

interface UsePropertyOne {
  isLoading: boolean;
  property: NormalizedProperty | null;
}

interface UsePropertyOneProps {
  id: string;
}

export const usePropertiesOne = ({ id }: UsePropertyOneProps): UsePropertyOne => {
  const reviewsSwrUrl = ApiEndpoint.REVIEWS + `/${id}`;
  const fetcher = (): Promise<NormalizedPropertyRepsonse> => getPropertyReviewsFetcher(id);
  const { data, isLoading } = useSWR(reviewsSwrUrl, fetcher);
  return {
    isLoading,
    property: data?.data || null,
  };
};

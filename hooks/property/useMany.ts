import useSWR from "swr";
import { useEffect, useMemo } from "react";

import { ApiEndpoint } from "@/api/hostaway/types";
import { getErrorMessage } from "@/utilities/helpers/getErrorMessage";
import { getPropertiesReviewsFetcher } from "@/utilities/fetchers/reviews";
import { NormalizedPropertiesRepsonse, NormalizedProperty } from "@/api/hostaway/reviews/types";

interface UsePropertiesMany {
  isLoading: boolean;
  properties?: NormalizedProperty[] | null;
}

export const usePropertiesMany = (): UsePropertiesMany => {
  const reviewsSwrUrl = ApiEndpoint.REVIEWS;
  const fetcher = (): Promise<NormalizedPropertiesRepsonse> => getPropertiesReviewsFetcher();
  const { data, isLoading, error } = useSWR(reviewsSwrUrl, fetcher);

  const { properties } = useMemo(() => {
    if (!data || !data.data) {
      return { properties: null };
    }
    return {
      properties: data.data,
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
    properties,
  };
};

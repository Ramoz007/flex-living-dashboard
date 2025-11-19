import useSWR from "swr";
import { useEffect, useMemo } from "react";

import { ApiEndpoint } from "@/api/hostaway/types";
import { getErrorMessage } from "@/utilities/helpers/getErrorMessage";
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
  const reviewsSwrUrl = ApiEndpoint.REVIEWS;
  const fetcher = (): Promise<NormalizedPropertyRepsonse> => getPropertyReviewsFetcher(id);
  const { data, isLoading, error } = useSWR(reviewsSwrUrl, fetcher);

  const { property } = useMemo(() => {
    if (!data || !data.data) {
      return { property: null };
    }
    return {
      property: data.data,
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
    property,
  };
};

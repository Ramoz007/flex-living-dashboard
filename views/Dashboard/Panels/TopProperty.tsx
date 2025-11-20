import { FC, useMemo } from "react";

import { Label } from "@/components/ui/label";
import { DashboardFilters } from "@/utilities/types/utilities";
import { filterReviews } from "@/utilities/helpers/filterReviews";
import { NormalizedProperty } from "@/api/hostaway/reviews/types";

interface TopPropertyProps {
  properties: NormalizedProperty[];
  filters?: DashboardFilters;
}

export const TopProperty: FC<TopPropertyProps> = ({ properties, filters }) => {
  // Helper to calculate average rating for a single property
  const getAverageForProperty = (property: NormalizedProperty): number => {
    const ratings: number[] = [];

    const relevantReviews = filters
      ? filterReviews(property.reviews ?? [], filters)
      : property.reviews ?? [];

    relevantReviews.forEach((review) => {
      review.categoryRatings?.forEach((cat) => {
        if (typeof cat.rating === "number") ratings.push(cat.rating);
      });
    });

    if (ratings.length === 0) return 0;
    return ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
  };

  const topProperty = useMemo(() => {
    let top: NormalizedProperty | null = null;
    let topRating = 0;

    properties.forEach((property) => {
      const avg = getAverageForProperty(property);
      if (avg > topRating) {
        topRating = avg;
        top = property;
      }
    });

    return top;
  }, [properties, filters]);
  return (
    <div className="flex flex-col items-center border-1 rounded-md p-3 w-[250px] h-[180px]">
      <Label className="text-[16px]">Best-performing Property</Label>
      <div className="flex justify-center pt-3">
        {topProperty ? (
          // @ts-ignore
          <span className="text-[24px] font-bold mt-6 text-center">{topProperty.listingName}</span>
        ) : (
          <p className="text-gray-500 text-sm">No rating data available</p>
        )}
      </div>
    </div>
  );
};

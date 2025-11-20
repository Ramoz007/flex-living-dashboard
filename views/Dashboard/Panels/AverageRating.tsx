import { NormalizedProperty } from "@/api/hostaway/reviews/types";
import { Label } from "@/components/ui/label";
import { filterReviews } from "@/utilities/helpers/filterReviews";
import { DashboardFilters } from "@/utilities/types/utilities";
import { FC, useMemo } from "react";

interface AverageRatingProps {
  properties: NormalizedProperty[];
  filters?: DashboardFilters;
}

export const AverageRating: FC<AverageRatingProps> = ({ properties, filters }) => {
  const average = useMemo(() => {
    const ratings: number[] = [];

    properties.forEach((property) => {
      // Apply filters if provided
      const relevantReviews = filters
        ? filterReviews(property.reviews ?? [], filters)
        : property.reviews ?? [];

      relevantReviews.forEach((review) => {
        review.categoryRatings?.forEach((cat) => {
          if (typeof cat.rating === "number") {
            ratings.push(cat.rating);
          }
        });
      });
    });

    return ratings.length > 0
      ? (ratings.reduce((sum, num) => sum + num, 0) / ratings.length).toFixed(1)
      : "0";
  }, [properties, filters]);
  return (
    <div className="flex flex-col items-center border-1 rounded-md p-3 w-[250px] h-[180px]">
      <Label className="text-[16px]">Average Rating</Label>
      <span className="text-[64px] font-bold mt-3">{average}</span>
    </div>
  );
};

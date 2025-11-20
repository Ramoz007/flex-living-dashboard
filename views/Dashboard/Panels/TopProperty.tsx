import { NormalizedProperty } from "@/api/hostaway/reviews/types";
import { Label } from "@/components/ui/label";
import { FC } from "react";

interface TopPropertyProps {
  properties: NormalizedProperty[];
}

export const TopProperty: FC<TopPropertyProps> = ({ properties }) => {
  // Helper to calculate average rating for a single property
  const getAverageForProperty = (property: NormalizedProperty): number => {
    const ratings: number[] = [];

    property.reviews?.forEach((review) => {
      review.categoryRatings?.forEach((cat) => {
        if (typeof cat.rating === "number") ratings.push(cat.rating);
      });
    });

    if (ratings.length === 0) return 0;
    return ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
  };
  // Find highest-rated property
  let topProperty: NormalizedProperty | null = null;
  let topRating = 0;

  properties.forEach((property) => {
    const avg = getAverageForProperty(property);
    if (avg > topRating) {
      topRating = avg;
      topProperty = property;
    }
  });
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

import { NormalizedProperty } from "@/api/hostaway/reviews/types";
import { Label } from "@/components/ui/label";
import { FC } from "react";

interface ReviewCountProps {
  properties: NormalizedProperty[];
}

export const ReviewCount: FC<ReviewCountProps> = ({ properties }) => {
  const totalReviews = properties?.reduce(
    (sum, property) => sum + (property.reviews?.length ?? 0),
    0
  );
  return (
    <div className="flex flex-col items-center border-1 rounded-md p-3 w-[250px] h-[180px]">
      <Label className="text-[16px]">Total Reviews</Label>
      <span className="text-[64px] font-bold mt-3">{totalReviews}</span>
    </div>
  );
};

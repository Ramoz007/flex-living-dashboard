import { NormalizedProperty } from "@/api/hostaway/reviews/types";
import { Label } from "@/components/ui/label";
import { filterReviews } from "@/utilities/helpers/filterReviews";
import { DashboardFilters } from "@/utilities/types/utilities";
import { FC, useMemo } from "react";

interface ReviewCountProps {
  properties: NormalizedProperty[];
  filters?: DashboardFilters;
}

export const ReviewCount: FC<ReviewCountProps> = ({ properties, filters }) => {
  const totalReviews = useMemo(() => {
    if (!filters) {
      return properties?.reduce((sum, property) => sum + (property.reviews?.length ?? 0), 0);
    }

    return properties.reduce((sum, property) => {
      const filteredReviews = filterReviews(property.reviews ?? [], filters);
      return sum + filteredReviews.length;
    }, 0);
  }, [properties, filters]);
  return (
    <div className="flex flex-col items-center border-1 rounded-md p-3 w-[250px] h-[180px]">
      <Label className="text-[16px]">Total Reviews</Label>
      <span className="text-[64px] font-bold mt-3">{totalReviews}</span>
    </div>
  );
};

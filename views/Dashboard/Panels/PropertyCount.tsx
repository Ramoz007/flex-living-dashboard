import { NormalizedProperty } from "@/api/hostaway/reviews/types";
import { Label } from "@/components/ui/label";
import { filterReviews } from "@/utilities/helpers/filterReviews";
import { DashboardFilters } from "@/utilities/types/utilities";
import { FC, useMemo } from "react";

interface PropertyCountProps {
  properties: NormalizedProperty[];
  filters?: DashboardFilters;
}

export const PropertyCount: FC<PropertyCountProps> = ({ properties, filters }) => {
  const total = useMemo(() => {
    if (!filters) return properties.length;

    const filteredProperties = properties.filter((property) => {
      const filteredReviews = filterReviews(property.reviews ?? [], filters);
      return filteredReviews.length > 0;
    });

    return filteredProperties.length;
  }, [properties, filters]);
  return (
    <div className="flex flex-col items-center border-1 rounded-md p-3 w-[250px] h-[180px]">
      <Label className="text-[16px]">Total Properties</Label>
      <span className="text-[64px] font-bold mt-3">{total}</span>
    </div>
  );
};

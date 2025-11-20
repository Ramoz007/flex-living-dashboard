import { FC, useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Label } from "@/components/ui/label";
import { DashboardFilters } from "@/utilities/types/utilities";
import { filterReviews } from "@/utilities/helpers/filterReviews";
import { NormalizedProperty } from "@/api/hostaway/reviews/types";

interface PropertyPerformanceProps {
  properties: NormalizedProperty[];
  filters: DashboardFilters;
}

export const PropertyPerformance: FC<PropertyPerformanceProps> = ({ properties, filters }) => {
  const data = useMemo(() => {
    return properties.map((property) => {
      const filteredReviews = filterReviews(property.reviews ?? [], filters);

      const ratings: number[] = [];
      filteredReviews.forEach((review) => {
        review.categoryRatings?.forEach((cat) => {
          if (typeof cat.rating === "number") ratings.push(cat.rating);
        });
      });

      const avgRating =
        ratings.length > 0 ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : 0;

      return {
        name:
          property.listingName.length > 15
            ? property.listingName.slice(0, 15) + "..."
            : property.listingName,
        avgRating: parseFloat(avgRating.toFixed(1)),
      };
    });
  }, [properties, filters]);

  return (
    <div className="flex flex-col items-center w-full border-1 rounded-md p-2 h-[400px]">
      <Label className="text-[18px]">Property Performance - Average Ratings</Label>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} height={60} />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Bar dataKey="avgRating" fill="#8e8e8eff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

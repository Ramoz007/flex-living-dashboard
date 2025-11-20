import { NormalizedProperty } from "@/api/hostaway/reviews/types";
import { Label } from "@/components/ui/label";
import { FC } from "react";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface PropertyPerformanceProps {
  properties: NormalizedProperty[];
}

export const PropertyPerformance: FC<PropertyPerformanceProps> = ({ properties }) => {
  const data = properties.map((property) => {
    const ratings: number[] = [];

    property.reviews?.forEach((review) => {
      review.categoryRatings?.forEach((cat) => {
        if (typeof cat.rating === "number") ratings.push(cat.rating);
      });
    });

    const avgRating =
      ratings.length > 0 ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : 0;

    return {
      name: property.listingName,
      avgRating: parseFloat(avgRating.toFixed(1)),
    };
  });
  return (
    <div className="flex flex-col items-center w-full border-1 rounded-md p-2 h-[400px]">
      <Label className="text-[18px]">Property Performance Component</Label>
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

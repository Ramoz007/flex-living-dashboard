"use client";

import { FC } from "react";

import { PropertyDataGrid } from "@/views/Properties/Many/Table";
import { NormalizedProperty } from "@/api/hostaway/reviews/types";
// import { usePropertiesMany } from "@/hooks/property/useMany";

export const PropertiesPageContent: FC = () => {
  // const { isLoading, properties } = usePropertiesMany();
  const dummyProperty: NormalizedProperty = {
    listingName: "Demo Property",
    reviews: [
      {
        id: 7453,
        publicReview: "Great stay! Very clean and well-located.",
        categoryRatings: [
          { category: "cleanliness", rating: 10 },
          { category: "communication", rating: 7 },
          { category: "respect_house_rules", rating: 9 },
        ],
      },
    ],
  };
  const { isLoading, properties } = { isLoading: false, properties: [] };
  return (
    <div className="space-y-4">
      <PropertyDataGrid properties={[dummyProperty]} isLoading={isLoading} />
    </div>
  );
};

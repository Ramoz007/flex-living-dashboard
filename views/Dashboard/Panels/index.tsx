"use client";

import { FC } from "react";
import { ReviewTable } from "@/views/Dashboard/Panels/ReviewTable";
import { ReviewCount } from "@/views/Dashboard/Panels/ReviewCount";
import { TopProperty } from "@/views/Dashboard/Panels/TopProperty";
import { PropertyCount } from "@/views/Dashboard/Panels/PropertyCount";
import { AverageRating } from "@/views/Dashboard/Panels/AverageRating";
import { PropertyPerformance } from "@/views/Dashboard/Panels/PropertyPerformance";
import { usePropertiesMany } from "@/hooks/property/useMany";
import { SectionLoader } from "@/components/loaders/SectionLoader";

export const DashboardPanels: FC = () => {
  const { isLoading, properties } = usePropertiesMany();
  if (isLoading) {
    return <SectionLoader minHeight="200px" />;
  }
  return (
    <div>
      <div className="flex w-full flex-wrap flex-row gap-3 mb-4">
        <div className="flex flex-row flex-wrap justify-around w-full rounded-md gap-2">
          <PropertyCount properties={properties || []} />
          <ReviewCount properties={properties || []} />
          <AverageRating properties={properties || []} />
          <TopProperty properties={properties || []} />
        </div>
        <PropertyPerformance properties={properties || []} />
        <ReviewTable properties={properties || []} />
      </div>
    </div>
  );
};

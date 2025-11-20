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
import { DashboardFilters } from "@/utilities/types/utilities";

interface DashboardPanelsProps {
  filters: DashboardFilters;
}

export const DashboardPanels: FC<DashboardPanelsProps> = ({ filters }) => {
  const { isLoading, properties } = usePropertiesMany();
  if (isLoading) {
    return <SectionLoader minHeight="200px" />;
  }
  return (
    <div>
      <div className="flex w-full flex-wrap flex-row gap-3 mb-4">
        <div className="flex flex-row flex-wrap justify-around w-full rounded-md gap-2">
          <PropertyCount properties={properties || []} filters={filters} />
          <ReviewCount properties={properties || []} filters={filters} />
          <AverageRating properties={properties || []} filters={filters} />
          <TopProperty properties={properties || []} filters={filters} />
        </div>
        <PropertyPerformance properties={properties || []} filters={filters} />
        <ReviewTable properties={properties || []} filters={filters} />
      </div>
    </div>
  );
};

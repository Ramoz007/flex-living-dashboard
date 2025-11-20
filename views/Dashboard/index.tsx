"use client";

import { FC, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { DashboardPeriod } from "@/utilities/types/enum";
import { DashboardHeader } from "@/views/Dashboard/Header";
import { DashboardPanels } from "@/views/Dashboard/Panels";
import { DashboardFilters } from "@/utilities/types/utilities";
import { DashboardFiltersView } from "@/views/Dashboard/Filters";

export const DashboardView: FC = () => {
  const [currentFilters, setCurrentFilters] = useState<DashboardFilters>({
    period: DashboardPeriod.YEAR,
    rating: null,
    category: null,
    channel: null,
  });

  return (
    <div className="px-3">
      <DashboardHeader />
      <DashboardFiltersView
        onFiltersChange={() => {
          setCurrentFilters;
        }}
      />
      <Separator className="my-4" />
      <DashboardPanels />
    </div>
  );
};

"use client";

import { FC, useState } from "react";

import { Separator } from "@/components/ui/separator";
import { DashboardPeriod } from "@/utilities/types/enum";
import { DashboardHeader } from "@/views/Dashboard/Header";
import { DashboardFilters } from "@/utilities/types/utilities";
import { DashboardFiltersView } from "@/views/Dashboard/Filters";

export const DashboardView: FC = () => {
  const [_, setCurrentFilters] = useState<DashboardFilters>({
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
    </div>
  );
};

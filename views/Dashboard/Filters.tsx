import React, { useEffect, useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DashboardPeriod } from "@/utilities/types/enum";
import { DashboardFilters } from "@/utilities/types/utilities";
import { DASHBOARD_PERIOD_OPTIONS, DASHBOARD_RATING_OPTIONS } from "@/utilities/constants/general";
// import { useDashboardFilters } from "@/hooks/dashboard/useDashboardFilters";

interface DashboardFiltersViewProps {
  onFiltersChange: (filters: DashboardFilters) => void;
  className?: string;
}

export const DashboardFiltersView: React.FC<DashboardFiltersViewProps> = ({
  onFiltersChange,
  className,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<DashboardPeriod>(DashboardPeriod.YEAR);
  const [selectedRating, setSelectedRating] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedChannel, setSelectedChannel] = useState<string>("");

  // const { isLoading: isFilterLoading, channels, categories } = useDashboardFilters();

  const currentFilters: DashboardFilters = useMemo(
    () => ({
      period: selectedPeriod,
      rating: selectedRating,
      category: selectedCategory,
      channel: selectedChannel,
    }),
    [selectedPeriod, selectedRating, selectedCategory, selectedChannel]
  );

  useEffect(() => {
    onFiltersChange(currentFilters);
  }, [currentFilters]);

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="w-full flex items-center justify-end gap-4 flex-wrap">
        <Select
          value={selectedChannel}
          onValueChange={(value: string) => setSelectedChannel(value)}
        >
          <Label>Channel:</Label>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select channel" />
          </SelectTrigger>
          <SelectContent>
            {/* {!isFilterLoading &&
              channels &&
              channels.map((val) => (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              ))} */}
          </SelectContent>
        </Select>
        <Select value={selectedRating} onValueChange={(value: string) => setSelectedRating(value)}>
          <Label>Rating:</Label>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent>
            {DASHBOARD_RATING_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={selectedCategory}
          onValueChange={(value: string) => setSelectedCategory(value)}
        >
          <Label>Categories:</Label>
          <SelectTrigger className="w-[170px]">
            <SelectValue placeholder="Select categories" />
          </SelectTrigger>
          <SelectContent>
            {/* {!isFilterLoading &&
              categories &&
              categories.map((val) => (
                <SelectItem key={val} value={val}>
                  {val}
                </SelectItem>
              ))} */}
          </SelectContent>
        </Select>
        <Select
          value={selectedPeriod}
          onValueChange={(value: DashboardPeriod) => setSelectedPeriod(value)}
        >
          <Label>Period:</Label>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            {DASHBOARD_PERIOD_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

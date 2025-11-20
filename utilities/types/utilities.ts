import { LucideIcon } from "lucide-react";

import { spinnerSizeMap } from "@/utilities/constants/general";
import { DashboardPeriod, LocalPath } from "@/utilities/types/enum";

export interface DashboardFilters {
  period: DashboardPeriod;
  rating?: string | null;
  category?: string | null;
  channel?: string | null;
}

export interface Variables {
  hostawayApiKey?: string;
  indexDatabaseName: string;
  hostawayAccountId?: string;
  hostawayApiBaseUrl?: string;
  indexDatabaseVersion: number;
}

export interface MenuItem {
  title: string;
  pathname?: LocalPath;
  icon?: LucideIcon;
}

export interface SelectType {
  name: string;
  value: string;
}

export type Color = "primary" | "green" | "blue" | "red" | "yellow";

export type spinnerSizeType = keyof typeof spinnerSizeMap | number;

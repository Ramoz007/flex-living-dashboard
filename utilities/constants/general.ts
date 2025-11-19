import { BarChart3, House } from "lucide-react";

import { LocalPath } from "@/utilities/types/enum";
import { SelectType, Variables } from "@/utilities/types/utilities";
import { DashboardPeriod, DashboardRating } from "@/utilities/types/enum";

export const OVERVIEW_SIDEBAR_MENU_ITEMS = [
  { title: "Dashboard", pathname: LocalPath.DASHBOARD, icon: BarChart3 },
  { title: "Properties", pathname: LocalPath.PROPERTIES, icon: House },
];

export const DASHBOARD_PERIOD_OPTIONS: SelectType[] = [
  { name: "Day", value: DashboardPeriod.DAY },
  { name: "Week", value: DashboardPeriod.WEEK },
  { name: "Month", value: DashboardPeriod.MONTH },
  { name: "Quarter", value: DashboardPeriod.QUARTER },
  { name: "Year", value: DashboardPeriod.YEAR },
];

export const DASHBOARD_RATING_OPTIONS: SelectType[] = [
  { name: "1", value: DashboardRating.ONE },
  { name: "2", value: DashboardRating.TWO },
  { name: "3", value: DashboardRating.THREE },
  { name: "4", value: DashboardRating.FOUR },
  { name: "5", value: DashboardRating.FIVE },
  { name: "6", value: DashboardRating.SIX },
  { name: "7", value: DashboardRating.SEVEN },
  { name: "8", value: DashboardRating.EIGHT },
  { name: "9", value: DashboardRating.NINE },
  { name: "10", value: DashboardRating.TEN },
];

export const VARIABLES: Variables = {
  hostawayApiKey: process.env.NEXT_PUBLIC_HOSTAWAY_BASE_URL,
  hostawayAccountId: process.env.NEXT_PUBLIC_HOSTAWAY_BASE_URL,
  hostawayApiBaseUrl: process.env.NEXT_PUBLIC_HOSTAWAY_BASE_URL,
};

export const colorClasses = {
  primary: { background: "bg-primary/20", bar: "bg-primary" },
  green: { background: "bg-green-200", bar: "bg-green-600" },
  blue: { background: "bg-blue-200", bar: "bg-blue-600" },
  red: { background: "bg-red-200", bar: "bg-red-600" },
  yellow: { background: "bg-yellow-200", bar: "bg-yellow-600" },
};

export const spinnerSizeMap = {
  "1": 8,
  "2": 16,
  "3": 24,
  "4": 32,
};

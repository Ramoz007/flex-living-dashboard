import { DashboardFilters } from "@/utilities/types/utilities";
import { PropertyListingReview, PropertyReview } from "@/api/hostaway/reviews/types";

export const filterReviews = (
  reviews: PropertyListingReview[] | PropertyReview[],
  filters: DashboardFilters
) => {
  console.log("Applying filters:", reviews, filters);
  let output = [...reviews];

  // 1. CHANNEL
  if (filters.channel) {
    output = output.filter((r) => r.status === filters.channel);
  }

  // 2. RATING
  if (filters.rating) {
    const numeric = Number(filters.rating);
    output = output.filter((r) =>
      (r.categoryRatings ?? []).some((c: any) => (c.rating ?? 0) >= numeric)
    );
  }

  // 3. CATEGORY
  if (filters.category) {
    output = output.filter((r) =>
      (r.categoryRatings ?? []).some((c: any) => c.category === filters.category)
    );
  }

  // 4. PERIOD
  if (filters.period) {
    const now = new Date();
    const cutoff = new Date();

    if (filters.period === "year") cutoff.setFullYear(now.getFullYear() - 1);
    if (filters.period === "month") cutoff.setMonth(now.getMonth() - 1);
    if (filters.period === "week") cutoff.setDate(now.getDate() - 7);

    output = output.filter((r) => new Date(r.submittedAt) >= cutoff);
  }

  return output;
};

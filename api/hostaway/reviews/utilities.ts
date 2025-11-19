import {
  NormalizedProperty,
  NormalizedReview,
  PropertyReview,
  Review,
} from "@/api/hostaway/reviews/types";

/**
 * Parses raw review data from API or mock source into structured Review objects.
 *
 * @param data - The raw data object that contains review results.
 * @returns {Review[] | null} Returns an array of Review objects if valid, otherwise null.
 */
export const parseReviewData = (data: any): Review[] | null => {
  if (!Array.isArray(data.result)) {
    return null;
  }
  const parsedData: Review[] = data.result.map((item: any) => ({
    id: item.id,
    type: item.type,
    status: item.status,
    rating: item.rating,
    review: item.publicReview,
    submittedAt: item.submittedAt,
    guestName: item.guestName,
    listingName: item.listingName,
    categories: item.reviewCategory.map((c: any) => ({
      category: c.category,
      rating: c.rating,
    })),
  }));
  return parsedData;
};

/**
 * Normalizes a single Review object into a NormalizedReview object.
 *
 * Normalization transforms the data into a more usable format:
 * - Extracts category names.
 * - Extracts numerical ratings and calculates the average rating.
 * - Converts submittedAt to ISO string format.
 *
 * @param review - A Review object to normalize.
 * @returns {NormalizedReview} The normalized review object.
 */
export function normalizeReview(review: Review): NormalizedReview {
  const categories = review.reviewCategory?.map((c) => c.category) ?? [];
  const ratings =
    review.reviewCategory?.map((c) => c.rating).filter((r): r is number => typeof r === "number") ??
    [];
  const averageRating =
    ratings.length > 0
      ? Number((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2))
      : null;
  return {
    id: review.id,
    type: review.type,
    status: review.status,
    publicReview: review.publicReview,
    submittedAt: new Date(review.submittedAt).toISOString(),
    categories,
    ratings,
    listingName: review.listingName,
    averageRating,
  };
}

/**
 * Normalizes an array of Review objects into NormalizedReview objects.
 *
 * @param reviews - Array of Review objects.
 * @returns {NormalizedReview[]} Array of normalized reviews.
 */
export function normalizeReviewData(reviews: Review[]): NormalizedReview[] {
  return reviews.map(normalizeReview);
}

/**
 * Normalizes all reviews belonging to a single property.
 *
 * Filters the provided list of reviews by `propertyId` (matching `listingName`),
 * then formats each review into a simplified `PropertyReview` shape.
 *
 * @param {string} propertyId - The ID/name of the property to extract reviews for.
 * @param {Review[]} reviews - The full list of raw review objects.
 * @returns {NormalizedProperty} A normalized property object containing the listing name
 * and its formatted reviews, or `null` if no reviews are present.
 */
export const normalizePropertyReviews = (
  propertyId: string,
  reviews: Review[]
): NormalizedProperty => {
  const propertyReviews = reviews.filter((review) => review.listingName === propertyId);
  const formattedReviews: PropertyReview[] = propertyReviews.map((review) => ({
    id: review.id,
    publicReview: review.publicReview,
    categoryRatings: review.reviewCategory,
  }));
  return {
    listingName: propertyId,
    reviews: formattedReviews.length > 0 ? formattedReviews : null,
  };
};

/**
 * Groups raw reviews by property (`listingName`) and normalizes each group.
 *
 * This function:
 * - Groups all reviews by their `listingName`.
 * - Converts each group into a consistent `NormalizedProperty` structure.
 * - Formats each review into a `PropertyReview`.
 *
 * @param {Review[]} reviews - The full list of raw review objects.
 * @returns {NormalizedProperty[]} A list of normalized property review objects.
 */
export const normalizePropertiesReviews = (reviews: Review[]): NormalizedProperty[] => {
  const grouped: Record<string, Review[]> = reviews.reduce((acc, review) => {
    if (!acc[review.listingName]) {
      acc[review.listingName] = [];
    }
    acc[review.listingName].push(review);
    return acc;
  }, {} as Record<string, Review[]>);
  const normalizedPropertiesReviews: NormalizedProperty[] = Object.entries(grouped).map(
    ([listingName, listingReviews]) => {
      const formattedReviews: PropertyReview[] = listingReviews.map((review) => ({
        id: review.id,
        publicReview: review.publicReview ?? null,
        categoryRatings: review.reviewCategory,
      }));
      return {
        listingName,
        reviews: formattedReviews.length > 0 ? formattedReviews : null,
      };
    }
  );
  return normalizedPropertiesReviews;
};

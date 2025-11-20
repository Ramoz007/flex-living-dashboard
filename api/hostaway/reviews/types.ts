import { DataServiceResponse } from "@/api/hostaway/types";

// ORIGINAL STRUCTURE

export interface ReviewCategory {
  category: string;
  rating: number | null;
}

export interface Review {
  id: number;
  type: string;
  status: string;
  rating: number | null;
  publicReview: string | null;
  submittedAt: string;
  guestName: string;
  listingName: string;
  reviewCategory: ReviewCategory[];
}

// Hostaway/Mock API RESPONSE

export interface GetReviewsResponseApi {
  status: string;
  result: Review[];
}

// NORMALISED STRUCTURES

// Normalized per review

export interface NormalizedReview {
  id: number;
  type: string;
  status: string; // will be used for channel filtering
  publicReview: string | null;
  submittedAt: string;
  categories: string[];
  ratings: number[];
  listingName: string;
  averageRating: number | null;
}

// Normalized per listing name

export interface PropertyListingReview {
  id: number;
  status: string; // will be used for channel filtering
  listingName: string;
  submittedAt: string;
  publicReview: string | null;
  categoryRatings: ReviewCategory[] | null;
}

export interface PropertyReview {
  id: number;
  status: string; // will be used for channel filtering
  submittedAt: string;
  publicReview: string | null;
  categoryRatings: ReviewCategory[] | null;
}

export interface NormalizedProperty {
  listingName: string;
  reviews: PropertyReview[] | null;
}

// more to come...

// API RESPONSES

export type ReviewsRepsonse = DataServiceResponse<Review[] | null> | null;

export type NormalizedReviewsRepsonse = DataServiceResponse<NormalizedReview[] | null> | null;

export type NormalizedPropertyRepsonse = DataServiceResponse<NormalizedProperty | null> | null;

export type NormalizedPropertiesRepsonse = DataServiceResponse<NormalizedProperty[] | null> | null;

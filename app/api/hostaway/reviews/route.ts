import { NextResponse } from "next/server";

import { ReviewsService } from "@/api/hostaway/reviews/service";

export async function GET() {
  try {
    const reviewsService = new ReviewsService();
    const response = await reviewsService.getNormalizedReviews({ isMocked: true });

    if (!response || !response.success) {
      return NextResponse.json({ status: "error", message: response?.message }, { status: 500 });
    }

    return NextResponse.json({
      status: "success",
      data: response.data,
    });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: `Something went wrong! ${error}` },
      { status: 500 }
    );
  }
}

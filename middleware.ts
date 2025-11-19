import { NextRequest, NextResponse } from "next/server";

export const middleware = async (
  _: NextRequest
): Promise<NextResponse<unknown>> => {
  const res = NextResponse.next();
  res.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return res;
};

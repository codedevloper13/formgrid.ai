import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/api/stripe/create-checkout",
    "/api/razorpay/create-order",
    "/api/razorpay/verify-payment",
    "/dashboard/:path*",
    "/pricing",
  ],
};

export const middleware = withAuth(
  async (req: NextRequest) => {
    const pathname = req.nextUrl.pathname;
    
    // Allow webhook endpoints to bypass authentication
    if (pathname.startsWith('/api/stripe/webhook') || pathname.startsWith('/api/razorpay/webhook')) {
      return NextResponse.next();
    }
    
    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    return response;
  }
);

import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // =========================================================
  // Public Routes
  // =========================================================

  // الـ Login موجود في Root
  const publicRoutes = ["/"];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // =========================================================
  // Cookies
  // =========================================================

  const token = request.cookies.get("token")?.value;
  const userCookie = request.cookies.get("user")?.value;

  // =========================================================
  // 1. المستخدم مش عامل Login
  // =========================================================

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // =========================================================
  // 2. المستخدم عامل Login وحاول يدخل صفحة Login "/"
  // =========================================================

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/Customers", request.url));
  }

  // =========================================================
  // 3. مفيش Token وداخل Root
  // =========================================================

  if (!token) {
    return NextResponse.next();
  }

  // =========================================================
  // 4. قراءة بيانات المستخدم
  // =========================================================

  let user = null;

  try {
    user = userCookie ? JSON.parse(userCookie) : null;
  } catch (error) {
    console.error("Invalid user cookie");

    return NextResponse.redirect(new URL("/", request.url));
  }

  // =========================================================
  // 5. استخراج Role
  // =========================================================

  const role = user?.roles?.[0]?.toLowerCase();

  if (!role) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // =========================================================
  // 6. Admin Only Routes
  // =========================================================

  const adminRoutes = ["/Users"];

  const isAdminRoute = adminRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // =========================================================
  // 7. User يحاول دخول صفحة Admin
  // =========================================================

  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/Customers", request.url));
  }

  // =========================================================
  // 8. باقي الـ Routes
  // Admin + User
  // =========================================================

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/Customers/:path*", "/Users/:path*"],
};

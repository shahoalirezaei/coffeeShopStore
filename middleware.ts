// middleware.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';  // تابع تایید توکن
import { NextRequest } from 'next/server';

// بررسی احراز هویت
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  // اگر توکن وجود نداشته باشد، به صفحه‌ی لاگین هدایت می‌کند
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // بررسی معتبر بودن توکن
  try {
    const decoded = verifyToken(token); // تایید توکن
    if (!decoded) {
      return NextResponse.redirect(new URL('/login', request.url)); // اگر توکن معتبر نباشد، هدایت به صفحه لاگین
    }
    return NextResponse.next(); // ادامه درخواست در صورت معتبر بودن توکن
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url)); // اگر توکن نامعتبر باشد، هدایت به صفحه لاگین
  }
}

// مشخص کردن مسیرهایی که این middleware باید برای آنها فعال باشد
export const config = {
  matcher: ['/my-account/*'], // اینجا مسیرهایی که نیاز به بررسی احراز هویت دارند
};

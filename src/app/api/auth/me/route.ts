// src/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import UserModel from "@/models/User";

export async function GET() {
  try {
    await dbConnect(); // اتصال به MongoDB

    // cookies() در app router sync است — نیازی به await نیست
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    // verifyToken باید DecodedUser | null برگردونه (ایمن)
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json({ user: null }, { status: 403 });
    }

    // جستجوی کاربر با id از توکن — از select برای حذف password استفاده می‌کنیم
    const user = await UserModel.findById(decoded.id).select("-password").lean();

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    // موفقیت‌آمیز
    return NextResponse.json({ user }, { status: 200 });
  } catch (err: unknown) {
    const message =
      err && typeof err === "object" && "message" in err
        ? (err as { message: string }).message
        : "خطا در دریافت اطلاعات";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

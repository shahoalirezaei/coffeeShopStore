import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import UserModel from "@/models/User"; 

export async function GET() {
  try {
    await dbConnect(); // اتصال به MongoDB

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = verifyToken(token);
    } catch {
      return NextResponse.json({ user: null }, { status: 403 });
    }

    if (!decoded?.id) {
      return NextResponse.json({ user: null }, { status: 403 });
    }

    // جستجوی کاربر در دیتابیس
    const user = await UserModel.findById(decoded.id).lean();

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    // موفقیت‌آمیز
    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/user error:", error);
    return NextResponse.json(
      { error: "خطا در بررسی کاربر یا اتصال به دیتابیس", user: null },
      { status: 500 }
    );
  }
}

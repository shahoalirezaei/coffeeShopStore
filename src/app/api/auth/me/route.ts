import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import UserModel from "@/models/User";
import { User } from "@/types";

export async function GET() {
  try {
    await dbConnect(); // اتصال به MongoDB

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 401 });
    }

    let decoded: User;
    try {
      decoded = verifyToken(token) as User;
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
  } catch (err: unknown) {
    const message =
      err && typeof err === "object" && "message" in err
        ? (err as { message: string }).message
        : "خطا در دریافت اطلاعات";

    // برای API route
    return NextResponse.json({ error: message }, { status: 500 });

    // یا برای useAuth
  }
}

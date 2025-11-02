// src/app/api/blogs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import BlogModel from "@/models/Blog";

// GET: دریافت همه مقالات
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const blogs = await BlogModel.find().sort({ createdAt: -1 }); // آخرین‌ها اول
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json({ error: "خطا در دریافت مقالات" }, { status: 500 });
  }
}

// POST: ایجاد مقاله جدید
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // اعتبارسنجی اولیه ساده
    if (!body.slug || !body.title || !body.image || !body.date) {
      return NextResponse.json(
        { error: "فیلدهای slug، title، image و date الزامی هستند" },
        { status: 400 }
      );
    }

    await dbConnect();
    console.log("MongoDB connected successfully");

    // ایجاد مقاله جدید
    const newBlog = await BlogModel.create({
      ...body,
      _id: body._id || crypto.randomUUID(), // اگر id نداشت، بساز
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/blogs error:", error);
    // بررسی خطای duplicate key (slug یکتا)
    if (error.code === 11000) {
      return NextResponse.json({ error: "این slug قبلاً ثبت شده است" }, { status: 409 });
    }
    return NextResponse.json({ error: "خطا در ایجاد مقاله" }, { status: 500 });
  }
}

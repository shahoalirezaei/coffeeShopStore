// src/app/api/blogs/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import BlogModel from "@/models/Blog";

// GET: دریافت همه مقالات
export async function GET() {
  try {
    await dbConnect();
    const blogs = await BlogModel.find().sort({ createdAt: -1 }); // آخرین‌ها اول
    return NextResponse.json(blogs, { status: 200 });
  } catch (err: unknown) {
    const message =
      err && typeof err === "object" && "message" in err
        ? (err as { message: string }).message
        : "خطا در دریافت اطلاعات";

    return NextResponse.json({ error: message }, { status: 500 });

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
  } catch (err: unknown) {
    const message =
      err && typeof err === "object" && "message" in err
        ? (err as { message: string }).message
        : "خطا در دریافت اطلاعات";

    return NextResponse.json({ error: message }, { status: 500 });

  }
}

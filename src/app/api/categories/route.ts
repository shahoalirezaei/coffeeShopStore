import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import CategoryModel from "@/models/Category";

export async function GET() {
  try {
    await dbConnect();
    const categories = await CategoryModel.find({});
    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    console.error("❌ Error fetching categories:", err);
    return NextResponse.json(
      { error: "خطا در دریافت دسته‌بندی‌ها" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { title, slug, image } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "عنوان و اسلاگ دسته‌بندی الزامی است" },
        { status: 400 }
      );
    }

    // بررسی تکراری بودن slug
    const exists = await CategoryModel.findOne({ slug });
    if (exists) {
      return NextResponse.json(
        { error: "دسته‌بندی‌ای با این اسلاگ وجود دارد" },
        { status: 409 }
      );
    }

    const category = await CategoryModel.create({
      title,
      slug,
      image: image || "",
      createdAt: new Date(),
    });

    return NextResponse.json(category, { status: 201 });
  } catch (err) {
    console.error("❌ Error creating category:", err);
    return NextResponse.json({ error: "خطا در ایجاد دسته‌بندی" }, { status: 500 });
  }
}

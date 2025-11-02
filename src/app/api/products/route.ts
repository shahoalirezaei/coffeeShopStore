import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import ProductModel from "@/models/Product";
import { ProductBoxProps } from "@/types";

// ✅ گرفتن تمام محصولات
export async function GET() {
  try {
    await dbConnect();
    console.log("✅ MongoDB connected successfully");

    const products = await ProductModel.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching products:", error);

    return NextResponse.json(
      {
        message: "خطا در دریافت محصولات",
        error: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}

// ✅ افزودن محصول جدید
export async function POST(req: Request) {
  try {
    await dbConnect();

    const body: ProductBoxProps = await req.json();

    // بررسی تکراری بودن _id
    const exists = await ProductModel.findById(body._id);
    if (exists) {
      return NextResponse.json(
        { error: "این محصول قبلا اضافه شده" },
        { status: 409 }
      );
    }

    const product = await ProductModel.create(body);
    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error("❌ Error creating product:", err);
    return NextResponse.json(
      { error: "خطا در ایجاد محصول" },
      { status: 500 }
    );
  }
}

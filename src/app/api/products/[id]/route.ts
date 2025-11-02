import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import ProductModel from "@/models/Product";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const product = await ProductModel.findById(params.id);

    if (!product) {
      return NextResponse.json(
        { error: "محصولی با این شناسه یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.error("❌ Error fetching product:", err);
    return NextResponse.json(
      { error: "خطایی در دریافت محصول رخ داد" },
      { status: 500 }
    );
  }
}

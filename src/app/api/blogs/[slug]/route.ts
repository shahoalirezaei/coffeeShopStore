import { NextRequest, NextResponse } from "next/server";
import BlogModel from "@/models/Blog";
import { dbConnect } from "@/lib/mongodb";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        await dbConnect();

        const { slug } = params;

        const blog = await BlogModel.findOne({ slug })
        if (!blog) {
            return NextResponse.json(
                { error: "مقاله مورد نظر یافت نشد" },
                { status: 404 }
            );
        }

        return NextResponse.json(blog, { status: 200 });

    } catch (error) {
        
        console.log("❌ GET /api/blogs/[slug] error:", error);
        return NextResponse.json(
            { error: "خطا در دریافت مقاله" },
            { status: 500 }
        );
    }
}
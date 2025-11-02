import { NextResponse } from "next/server";
import BlogModel from "@/models/Blog";
import { dbConnect } from "@/lib/mongodb";

export async function GET(req: Request, context: { params: Promise<{ slug: string }> }) {
    try {
        await dbConnect();

        const { slug } = await context.params;

        const blog = await BlogModel.findOne({ slug })
        if (!blog) {
            return NextResponse.json(
                { error: "مقاله مورد نظر یافت نشد" },
                { status: 404 }
            );
        }

        return NextResponse.json(blog, { status: 200 });

    } catch (err: unknown) {
        const message =
            err && typeof err === "object" && "message" in err
                ? (err as { message: string }).message
                : "خطا در دریافت اطلاعات";

        return NextResponse.json({ error: message }, { status: 500 });

    }
}
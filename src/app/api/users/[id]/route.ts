import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import UserModel from "@/models/User";
import { verifyToken } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { User } from "@/types";

interface UpdateUserBody {
    name?: string;
    email?: string;
    password?: string;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const { id } = await params;
        const cookieHeader = req.headers.get("cookie") || "";
        const token = cookieHeader
            .split(';')
            .find(c => c.trim().startsWith("token="))
            ?.split("=")[1];

        if (!token) {
            return NextResponse.json({ error: "احراز هویت نامعتبر است" }, { status: 401 })
        }
        const user = verifyToken(token)
        if (!user || user.id !== id) {
            return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
        }

        const body = await req.json()
        const { name, email, password } = body;

        const updateData: Partial<UpdateUserBody> = {}
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).select("-password")
        if (!updatedUser) {
            return NextResponse.json(
                { error: "کاربر یافت نشد" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "اطلاعات با موفقیت بروز رسانی شد",
            user: updatedUser,
        }, { status: 201 })
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "خطا در بروزرسانی اطلاعات" },
            { status: 500 }
        );
    }

}
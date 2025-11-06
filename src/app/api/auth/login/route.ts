import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import UserModel from "@/models/User";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "ایمیل و رمز عبور الزامی است" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "کاربری با این ایمیل یافت نشد" },
        { status: 404 }
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { success: false, error: "رمز عبور نادرست است" },
        { status: 401 }
      );
    }

    const token = signToken({ id: user._id.toString(), email: user.email });

    const res = NextResponse.json(
      {
        success: true,
        message: "ورود موفقیت‌آمیز بود",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("❌ Login error:", err);
    return NextResponse.json(
      { success: false, error: "خطایی در فرآیند ورود رخ داد" },
      { status: 500 }
    );
  }
}

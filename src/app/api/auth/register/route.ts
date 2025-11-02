// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { dbConnect } from "@/lib/mongodb";
import UserModel from "@/models/User"; // مدل Mongoose یوزر

export async function POST(req: Request) {
  try {
    await dbConnect(); // اتصال به دیتابیس

    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "تمام فیلدها الزامی هستند" },
        { status: 400 }
      );
    }

    // چک کردن اینکه ایمیل قبلا ثبت نشده باشه
    const exists = await UserModel.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { error: "این ایمیل قبلا ثبت شده است" },
        { status: 409 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashPassword,
      role: "user",
    });

    const token = signToken({ id: newUser._id.toString(), email: newUser.email });

    const res = NextResponse.json(
      { message: "ثبت نام با موفقیت انجام شد", user: newUser },
      { status: 201 }
    );
    res.cookies.set("token", token, { httpOnly: true, maxAge: 60 * 60 * 24 * 7 });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "خطایی در ثبت نام رخ داده است" },
      { status: 500 }
    );
  }
}

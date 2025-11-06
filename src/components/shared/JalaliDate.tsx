"use client";
import moment from "jalali-moment";

export default function JalaliDate() {
  const m = moment().locale("fa");
  const weekday = m.format("dddd");
  const day = m.format("D");
  const month = m.format("MMMM");
  const year = m.format("YYYY");

  // تبدیل عددهای انگلیسی به فارسی
  const toPersianDigits = (str: string) =>
    str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

  const result = `${weekday} ${day} ${month} ${year}`

  return <>{toPersianDigits(result)}</>
}

// تبدیل عددهای انگلیسی به فارسی

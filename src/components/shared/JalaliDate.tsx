"use client";
import moment from "jalali-moment";

export default function JalaliDate() {
  const m = moment().locale("fa");
  const weekday = m.format("dddd");
  const day = m.format("D");
  const month = m.format("MMMM");
  const year = m.format("YYYY");

  return (
    <>
      {`${weekday} ${day} ${month} ${year}`}
    </>
    
  );
}

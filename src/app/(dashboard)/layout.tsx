import React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="h-screen flex">
      {/* اینجا بعداً می‌تونی سایدبار داشبورد بذاری */}
      <aside className="w-64 bg-gray-100 hidden md:inline-block p-4 h-screen">
        <h2 className="text-lg text-black pt-5  font-bold">Dashboard Menu</h2>
        {/* بعداً لینک‌ها رو اینجا اضافه می‌کنی */}
      </aside>

      <main className="flex-1 p-6 bg-white">{children}</main>
    </section>
  )
}

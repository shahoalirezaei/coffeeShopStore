"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
// import { User } from "@/types";
import { Check, Edit3, X } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import api from "@/lib/axios";
import toast from "react-hot-toast";



export default function Profile() {
  const { user, refetch, isLoading } = useAuth();
  const [editField, setEditField] = useState<null | "name" | "email" | "password">(null)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || ""
  });
  const [loading, setLoading] = useState<boolean>(false)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  useEffect(() => {
    if (editField === "name" && nameRef.current) nameRef.current.focus();
    if (editField === "email" && emailRef.current) emailRef.current.focus();
    if (editField === "password" && passwordRef.current) passwordRef.current.focus();
  }, [editField])

  if (isLoading) return <div className="h-25 text-center pt-12 font-DanaBold">در حال بارگذاری</div>
  if (!user || !user._id) return <div className="text-center mt-10">کاربر یافت نشد</div>


  const handleEditClick = (field: "name" | "email" | "password") => {
    setEditField(field)
    if (field !== "password") {
      setFormData({ ...formData, [field]: user[field] })
    } else {
      setFormData({ ...formData, password: "" })
    }
  }

  const handleCancel = () => setEditField(null)

  const handleSave = async () => {
    try {
      setLoading(true)
      const payload: { name?: string; email?: string; password?: string } = {};
      if (editField === "name") payload.name = formData.name;
      if (editField === "email") payload.email = formData.email;
      if (editField === "password") payload.password = formData.password;
      if (!user._id) toast.error("کاربر نا معتبر است")

      await api.patch(`/users/${user._id}`, payload)
      toast.success("اطلاعات با موفقیت بروزرسانی شد")
      await refetch();
      setEditField(null)

    } catch (err: unknown) {
      console.error(err);

      // چک می‌کنیم که err یه آبجکت شبیه AxiosError هست
      if (typeof err === "object" && err !== null && "response" in err) {
        const axiosError = err as { response?: { data?: { error?: string } } };
        toast.error(axiosError.response?.data?.error || "اطلاعات بروز رسانی نشد");
      } else {
        toast.error("اطلاعات بروز رسانی نشد");
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white dark:bg-zinc-700 dark:text-white shadow-sm rounded-xl overflow-hidden mb-10">
      {/* Header */}
      <div className="flex flex-col items-center justify-center p-6 border-b border-gray-100">
        <div className="relative w-24 h-24 mb-3">
          <Image
            src={user?.avatar || "/images/about/profile-team.jpg"}
            alt={user.name}
            fill
            className="rounded-full object-cover border border-gray-200"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{user.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">{user.email}</p>
      </div>

      {/* Info */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6  child:bg-gray-300 child:dark:bg-zinc-800 child:px-4 child:py-1 child:rounded-lg child:pb-2">
        {/* Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500 dark:text-gray-300">نام و نام خانوادگی</label>
          {editField === "name" ? (
            <div className="flex items-center gap-2">
              <input
                ref={nameRef}
                className="bg-transparent w-full outline-none text-gray-800 dark:text-white border-b border-gray-400"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <button className="cursor-pointer" onClick={handleSave} disabled={loading}>
                <Check className="w-5 h-5 text-green-600" />
              </button>
              <button className="cursor-pointer" onClick={handleCancel}>
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span>{user.name}</span>
              <Edit3 className="cursor-pointer" onClick={() => handleEditClick("name")} />
            </div>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500 dark:text-gray-300">ایمیل</label>
          {editField === "email" ? (
            <div className="flex items-center gap-2">
              <input
                ref={emailRef}
                className="bg-transparent w-full outline-none text-gray-800 dark:text-white border-b border-gray-400"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <button className="cursor-pointer" onClick={handleSave} disabled={loading}>
                <Check className="w-5 h-5 text-green-600" />
              </button>
              <button className="cursor-pointer" onClick={handleCancel}>
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span>{user.email}</span>
              <Edit3 className="cursor-pointer" onClick={() => handleEditClick("email")} />
            </div>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500 dark:text-gray-300">رمز عبور</label>
          {editField === "password" ? (
            <div className="flex items-center gap-2">
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                className="bg-transparent w-full outline-none text-gray-800 dark:text-white border-b border-gray-400"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-sm text-gray-600 dark:text-gray-300 cursor-pointer bg-gray-400 p-1.5 rounded-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              <button className="cursor-pointer" onClick={handleSave} disabled={loading}>
                <Check className="w-5 h-5 text-green-600" />
              </button>
              <button className="cursor-pointer" onClick={handleCancel}>
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span>*******</span>
              <Edit3 className="cursor-pointer" onClick={() => handleEditClick("password")} />
            </div>
          )}
        </div>

        {/* Role */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500 dark:text-gray-300">نقش کاربر</label>
          <p className="font-medium text-gray-800 dark:text-white">{user.role || "کاربر عادی"}</p>
        </div>

        {/* Created At */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500 dark:text-gray-300">تاریخ عضویت</label>
          <p className="font-medium text-gray-800 dark:text-white">
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString("fa-IR") : "نامشخص"}
          </p>
        </div>
      </div>
    </section>
  );
}




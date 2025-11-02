import { useEffect, useState, useCallback } from "react";
import api from "./axios";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser, logout } from "@/store/authSlice";
import { User } from "@/types";

export function useAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ تابع دریافت مجدد کاربر (قابل استفاده بعد از login/logout)
  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await api.get<{ user: User }>("auth/me");
      dispatch(setUser(res.data.user));
    } catch (err: any) {
      dispatch(setUser(null));
      setError(err?.response?.data?.message || "خطا در دریافت اطلاعات کاربر");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  // ✅ اجرای فقط یکبار وقتی کاربر وجود نداره
  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  // ✅ تابع خروج (اختیاری، در صورت وجود endpoint سرور)
  const handleLogout = useCallback(async () => {
    try {
      await api.post("auth/logout");
    } catch {
      // حتی اگه API ارور داد، سمت کلاینت کاربر رو حذف می‌کنیم
    } finally {
      dispatch(logout());
      // 🔁 فورس رفرش رابط کاربری (در صورت نیاز)
      window.location.reload();
    }
  }, [dispatch]);

  return {
    user,
    isLoading,
    error,
    refetch: fetchUser,  // برای دستی رفرش کردن auth
    logout: handleLogout // برای خروج و رندر مجدد
  };
}

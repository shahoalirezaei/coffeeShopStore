import axios from "axios";

const baseURL =
  typeof window === "undefined"
    ? process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api`
      : "http://localhost:3000/api"
    : "/api";

const api = axios.create({
  baseURL,
  timeout: 20000,
  withCredentials: true,
});

export default api;

import axios from "axios";

const api = axios.create({
  baseURL:
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_BASE_URL + "/api"
      : "/api",
});


export default api


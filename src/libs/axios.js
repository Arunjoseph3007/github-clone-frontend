import axs from "axios";

const axios = axs.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || "";
  config.headers.Authorization = `Token ${token}`;

  return config;
});

export default axios;

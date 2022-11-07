import axs from "axios";

const axios = axs.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

axios.interceptors.request.use((config) => {
  let token;
  try {
    token = localStorage.getItem("token") || "";
  } catch (e) {
    console.log(e);
  }
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});

export default axios;

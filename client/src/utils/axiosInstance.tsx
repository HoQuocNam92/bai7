import axios from "axios";

const API_URL = "http://localhost:8080/auth"; // Thay bằng API backend của bạn

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.config && error.config.status === 401) {
      try {
        const res = await axiosInstance.post("/refresh");
        localStorage.setItem("accessToken", res.data.accessToken);
        error.config.headers.Authorization = res.data.accessToken;
        return axiosInstance.request(error.config);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;

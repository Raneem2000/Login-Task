import axios from "axios";
import Cookie from "cookie-universal";

const cookies = Cookie();

const apiClient = axios.create({
  baseURL: "https://one-hand",
  headers: {
    "Content-Type": "application/json",
    "X-secret-key": "OH2024",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      cookies.remove("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;

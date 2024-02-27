import axios from "axios";

const notificationApi = axios.create({
  baseURL: import.meta.env.VITE_NOTIFICATION_API_BASE_URL,
});

notificationApi.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("authToken");
  return config;
});

notificationApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default notificationApi;

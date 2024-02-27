import axios from "axios";

const identityApi = axios.create({
  baseURL: import.meta.env.VITE_IDENTITY_API_BASE_URL,
});

identityApi.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("authToken");
  return config;
});

identityApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default identityApi;

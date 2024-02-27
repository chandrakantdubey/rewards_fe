import axios from "axios";
import { getToken } from "../auth/getToken";
import { getAzureId } from "../auth/getAzureId";
import { UNAUTHORIZED_USER } from "../constants/statusCodes";

const rewardsApi = axios.create({
  baseURL: import.meta.env.VITE_REWARDS_API_BASE_URL,
});

rewardsApi.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";
  config.headers.Authorization = getToken();
  config.params = {
    azureId: getAzureId(),
    ...config.params,
  };
  return config;
});

rewardsApi.interceptors.response.use(
  (response) => {
    if (response.status === UNAUTHORIZED_USER) {
      // clearStorageData();
      // redirectLogout();
    }
    return response;
  },
  (error) => {
    const { response } = error;
    if (response?.status === UNAUTHORIZED_USER) {
      // logoutUserHandler();
      // redirectLogout();
    }
    return Promise.reject(error);
  }
);

export default rewardsApi;

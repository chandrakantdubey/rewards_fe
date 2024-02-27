import { uvationApiInstance } from "../api/axiosInstance";
import { LOGOUT_USER_API } from "../constants/apiEndpoints";
import { getAzureId } from "./getAzureId";
import { getToken } from "./getToken";

export const logoutUser = async () => {
  const response = { error: "", data: null };
  try {
    response.data = await uvationApiInstance.put(
      `${LOGOUT_USER_API}?azureId=${getAzureId()}`,
      {},
      {
        headers: {
          Authorization: getToken(),
        },
      }
    );
  } catch (err) {
    response.error = err.response;
  }
  return response;
};

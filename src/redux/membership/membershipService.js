import axios from "axios";
import { GET_MEMBERSHIP } from "../../constants/apiEndpoints";
import { getAzureId } from "../../auth/getAzureId";

export const getMembershipService = async () => {
  const response = await axios.get(
    import.meta.env.VITE_REWARDS_API_BASE_URL +
      "/" +
      GET_MEMBERSHIP +
      `?azureId=${getAzureId()}`,
    {
      headers: {
        Authorization: localStorage.getItem("loginToken"),
      },
    }
  );
  return response?.data?.data;
};

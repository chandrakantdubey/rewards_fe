import axios from "axios";
import { GENERATE_TOKEN_API } from "../../constants/apiEndpoints";
import { getItem } from "../../services/localStorageService";

const loginUser = async (data) => {
  try {
    const response = await axios.put(
      `${
        import.meta.env.VITE_REWARDS_API_BASE_URL
      }/${GENERATE_TOKEN_API}?azureId=${data?.azureId}`
    );
    return response?.data?.data;
  } catch (err) {
    setTimeout(() => loginUser(getItem("azureId")), 3000);
    const error = JSON.stringify(err);
    throw new Error(error);
  }
};

const singleSignOnService = { loginUser };

export default singleSignOnService;

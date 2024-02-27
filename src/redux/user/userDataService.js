import identityApi from "../../api/identityApi";
import { GET_USER_INFO } from "../../constants/apiEndpoints";

const userDataService = async (azureId) => {
  try {
    const response = await identityApi.get(
      `${GET_USER_INFO}?azureId=${azureId}`
    );
    return response?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

export default userDataService;

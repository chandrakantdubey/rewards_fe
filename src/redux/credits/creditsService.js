import rewardsApi from "../../api/rewardsApi";
import {
  GET_CLOUD_CREDIT,
  GET_CLOUD_CREDIT_LIST,
} from "../../constants/apiEndpoints";
import { getQsValues } from "../../services/getQsValues";

const getCreditsList = async (data) => {
  try {
    const newQsValue = getQsValues(data);
    const response = await rewardsApi.get(
      `${GET_CLOUD_CREDIT_LIST}?${newQsValue}`
    );
    return response?.data?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

export async function getUSPCredits() {
  try {
    const response = await rewardsApi.get(GET_CLOUD_CREDIT);
    const data = await response.data.data;
    return data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
}

const creditsService = { getCreditsList, getUSPCredits };

export default creditsService;

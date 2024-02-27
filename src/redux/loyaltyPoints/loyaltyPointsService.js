import rewardsApi from "../../api/rewardsApi";
import {
  LOYALTY_POINTS_API,
  MY_LOYALTY_LIST_API,
} from "../../constants/apiEndpoints";
import { getQsValues } from "../../services/getQsValues";

const getLoyaltyPointsList = async (data) => {
  try {
    const newQsValue = getQsValues(data);
    const response = await rewardsApi.get(
      `${MY_LOYALTY_LIST_API}?${newQsValue}`
    );
    return response?.data?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

const getLoyaltyPoints = async () => {
  try {
    const response = await rewardsApi.get(LOYALTY_POINTS_API);
    return response?.data?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

const loyaltyPointsService = { getLoyaltyPointsList, getLoyaltyPoints };

export default loyaltyPointsService;

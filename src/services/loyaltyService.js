import rewardsApi from "../api/rewardsApi";
import { LOYALTY_POINTS_API } from "../constants/apiEndpoints";

export const getLoyaltyPointsService = async () => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.get(LOYALTY_POINTS_API);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};

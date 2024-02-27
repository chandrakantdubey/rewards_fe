import rewardsApi from "../api/rewardsApi";
import { REFER_TO_FRIEND } from "../constants/apiEndpoints";

export const sendReferralRequest = async (data) => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.post(REFER_TO_FRIEND, data);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};

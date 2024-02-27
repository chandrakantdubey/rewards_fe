import rewardsApi from "../api/rewardsApi";
import { MY_DONATIONS_API } from "../constants/apiEndpoints";
export const sendDonationRequest = async (data) => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.post(MY_DONATIONS_API, data);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};

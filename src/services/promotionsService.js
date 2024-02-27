import rewardsApi from "../api/rewardsApi";
import { PROMOTION_DETAIL_API } from "../constants/apiEndpoints";
import { getQsValues } from "./getQsValues";

export const getPromotionDetail = async (data) => {
  const response = { error: "", data: null };
  try {
    const qsValue = getQsValues(data.qsString);
    response.data = await rewardsApi.get(
      `${PROMOTION_DETAIL_API}${data?.orderId}?${qsValue}`
    );
  } catch (err) {
    response.error = err.response;
  }
  return response;
};

import rewardsApi from "../api/rewardsApi";
import {
  GET_REDEEM_FREE,
  PLACE_ORDER_API,
  REDEEM_PROMOTION_FREE_ITEM,
} from "../constants/apiEndpoints";

export const placeOrderService = async (data) => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.post(PLACE_ORDER_API, data);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};

export const placeFreeItemOrderService = async (data) => {
  return await rewardsApi.post(REDEEM_PROMOTION_FREE_ITEM, data);
};
export const placePromotionFreeItemOrderService = async (data) => {
  return await rewardsApi.post(GET_REDEEM_FREE, data);
};

export const placeFreeGiftOrderService = async (data) => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.post(
      "customer/order/redeem-free-gift",
      data
    );
  } catch (err) {
    response.error = err.response;
  }
  return response;
};

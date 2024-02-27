import {
  FREE_ITEMS_API,
  LOYALTY_POINTS_API,
  PROMOTION_API,
  REFERRAL_API,
  GET_CLOUD_CREDIT,
  GET_MYPERMOTION_DATA,
  GET_CLOUD_CREDIT_LIST,
  GET_REDEEM_DATA,
  GET_REDEEM_FREE,
  GET_REDEEM_ADDRESS_DATA,
  GET_REDEEM_ITEM,
  SHIPPING_ADDRESS,
  FREE_CARDS,
  FREE_CARDS_REDEEM,
  GET_MEMBERSHIP,
} from "../constants/apiEndpoints";
import rewardsApi from "../api/rewardsApi";
import axios from "axios";

export const getFreeItemsService = async () => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.get(FREE_ITEMS_API);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};
export const getPromotionsService = async () => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.get(PROMOTION_API);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};
export const getLoyaltyPointsService = async () => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.get(LOYALTY_POINTS_API);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};
export const getReferralService = async () => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.get(REFERRAL_API);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};
export const getCloudCreditBalance = async () => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.get(`${GET_CLOUD_CREDIT}`);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};
export const myPromotionPoint = async (pageSize, skip) => {
  const response = { error: "", data: null };
  try {
    response.data =
      await rewardsApi.get(`${GET_MYPERMOTION_DATA}?limit=${pageSize}&skip=${skip}
`);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};
export const getCloudCreditList = async (pageSize, skip) => {
  const response = { error: "", data: null };
  try {
    response.data =
      await rewardsApi.get(`${GET_CLOUD_CREDIT_LIST}?limit=${pageSize}&skip=${skip}
`);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};

export const getRedeemPoints = async (pageSize, skip) => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.get(`${GET_REDEEM_DATA}`);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};
export const redeemFreeItems = async (data) => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.post(`${GET_REDEEM_FREE}`, data);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};
export const getRedeemAddressData = async () => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.get(`${GET_REDEEM_ADDRESS_DATA}`);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};
export const getRedeemItem = async (id) => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.get(`${GET_REDEEM_ITEM}?id=${id}`);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};
export const shippingAddressPost = async (data) => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.post(`${SHIPPING_ADDRESS}`, data);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};
export const shippingOldAddress = async (data) => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.put(`${SHIPPING_ADDRESS}`, data);
  } catch (err) {
    response.error = err.response;
  }
  return response;
};
export const getFreeCards = async ({ offset = 0, limit = 9 }) => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.get(
      `${FREE_CARDS}?limit=${limit}&offset=${offset}`
    );
  } catch (err) {
    response.error = err.message;
  } finally {
    return response;
  }
};
export const redeemGiftCard = async (brands) => {
  const response = { error: "", data: null };
  try {
    response.data = await rewardsApi.post(FREE_CARDS_REDEEM, brands);
  } catch (err) {
    response.error = err.message;
  } finally {
    return response;
  }
};

export async function getMembership() {
  const response = await axios.get(
    import.meta.env.VITE_REWARDS_API_BASE_URL +
      GET_MEMBERSHIP +
      "?azureId=2430be13-2d04-4577-9f08-5f1db2495d71",
    {
      headers: {
        Authorization: `GCbLtMuyaUiDGoz`,
      },
    }
  );
  const data = await response.data.data;
  return data;
}
export async function getUSPCredits() {
  const response = await rewardsApi.get(GET_CLOUD_CREDIT);
  const data = await response.data.data;
  return data;
}

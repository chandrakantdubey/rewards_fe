import rewardsApi from "../../api/rewardsApi";
import {
  MY_REDEMPTIONS_LIST_API,
  GIFT_REDEMPTIONS_LIST_API,
} from "../../constants/apiEndpoints";
import { getQsValues } from "../../services/getQsValues";

const getRedemptionList = async (data) => {
  try {
    const newQsValue = getQsValues(data);
    const response = await rewardsApi.get(
      `${MY_REDEMPTIONS_LIST_API}?${newQsValue}`
    );
    return response?.data?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

const getGiftRedemptionList = async (data) => {
  try {
    const newQsValue = getQsValues(data);
    const response = await rewardsApi.get(
      `${GIFT_REDEMPTIONS_LIST_API}?${newQsValue}`
    );
    return response?.data?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

const redemptionService = { getRedemptionList, getGiftRedemptionList };

export default redemptionService;

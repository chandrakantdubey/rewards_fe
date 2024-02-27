import rewardsApi from "../../api/rewardsApi";
import {
  GET_MYPERMOTION_DATA,
  GET_REDEEM_ITEM,
  PROMOTIONS_API,
} from "../../constants/apiEndpoints";
import { getQsValues } from "../../constants/getQsValues";

const getMyPromotionsList = async (data) => {
  try {
    const newQsValues = getQsValues(data);
    const response = await rewardsApi.get(`${PROMOTIONS_API}?${newQsValues}`);
    return response?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

const getMyUSPPromotionsList = async (data) => {
  try {
    const newQsValues = getQsValues(data);
    const response = await rewardsApi.get(
      `${GET_MYPERMOTION_DATA}?${newQsValues}`
    );
    return response?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};
const getUSPFreeItems = async (data) => {
  try {
    const newQsValues = getQsValues(data);
    const response = await rewardsApi.get(`${GET_REDEEM_ITEM}?${newQsValues}`);
    return response?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

const myPromotionsService = {
  getMyPromotionsList,
  getMyUSPPromotionsList,
  getUSPFreeItems,
};

export default myPromotionsService;

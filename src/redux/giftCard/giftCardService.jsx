import rewardsApi from "../../api/rewardsApi";
import { FREE_CARDS } from "../../constants/apiEndpoints";
import { getQsValues } from "../../constants/getQsValues";

export const getGiftCardService = async (data) => {
  try {
    const newQsValue = getQsValues(data);
    const response = await rewardsApi.get(`${FREE_CARDS}?${newQsValue}`);
    return response?.data?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

export const getGiftCardByIdService = async (data) => {
  try {
    const response = await rewardsApi.get(`/customer/brand-info/${data}`);
    return response?.data?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

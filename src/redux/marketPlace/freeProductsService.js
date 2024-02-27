import rewardsApi from "../../api/rewardsApi";
import { LOYALTY_FREE_ITEM_API } from "../../constants/apiEndpoints";
import { getQsValues } from "../../constants/getQsValues";

export const getFreeProductsService = async (data) => {
  try {
    const newQsValue = getQsValues(data);
    const response = await rewardsApi.get(
      `${LOYALTY_FREE_ITEM_API}?${newQsValue}`
    );
    return response?.data?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

export const getBrandsService = async (data) => {
  try {
    // const newQsValue = getQsValues(data);
    const response = await rewardsApi.get("customer/brands-list");
    return response?.data?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

export const getCategoriesService = async (data) => {
  try {
    // const newQsValue = getQsValues(data);
    const response = await rewardsApi.get(
      "customer/category/loyalty-free-item"
    );
    return response?.data?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

export const getFreeGiftItemsService = async (data) => {
  try {
    // const newQsValue = getQsValues(data);
    const response = await rewardsApi.get("customer/free-gifts");
    return response?.data?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

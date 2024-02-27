import _ from "lodash";
import rewardsApi from "../../api/rewardsApi";
import {
  MY_ALL_PUBLIC_CHARITY_API,
  MY_DONATIONS_API,
} from "../../constants/apiEndpoints";
import { getQsValues } from "../../constants/getQsValues";

const getCharityList = async (data) => {
  try {
    const newQsValue = getQsValues(_.omit(data, "loadMore"));
    const response = await rewardsApi.get(
      `${MY_ALL_PUBLIC_CHARITY_API}?${newQsValue}`
    );
    return {result : response?.data?.data?.result , loadMore : data.loadMore};
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

const getDonationsList = async (data) => {
  try {
    const newQsValue = getQsValues(data);
    const response = await rewardsApi.get(`${MY_DONATIONS_API}?${newQsValue}`);
    return response?.data?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

const getPreferedCharityList = async (data) => {
  try {
    const newQsValue = getQsValues(data);
    const response = await rewardsApi.get(
      `customer/search-charity?${newQsValue}`
    );
    return response?.data?.data?.result;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

const getCategoryCharityList = async () => {
  try {
    const response = await rewardsApi.get(`public/get-all-charity-categories`);
    return response?.data?.data?.result;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

const charityService = {
  getDonationsList,
  getCharityList,
  getPreferedCharityList,
  getCategoryCharityList,
};

export default charityService;

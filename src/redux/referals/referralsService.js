import rewardsApi from "../../api/rewardsApi";
import { MY_REFERRALS_API } from "../../constants/apiEndpoints";
import { getQsValues } from "../../services/getQsValues";

const getReferralsList = async (data) => {
  try {
    const newQsValues = getQsValues(data);
    const response = await rewardsApi.get(`${MY_REFERRALS_API}?${newQsValues}`);
    return response?.data?.data;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

const referralsService = { getReferralsList };

export default referralsService;

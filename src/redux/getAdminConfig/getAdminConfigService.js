import rewardsApi from "../../api/rewardsApi";
import { GET_ADMIN_CONFIG } from "../../constants/apiEndpoints";

const getAdminConfig = async () => {
  try {
    const response = await rewardsApi.get(GET_ADMIN_CONFIG, {});
    const requiredRes = {
      automaticPromotionReleaseDays:
        response?.data?.data?.automaticPromotionReleaseDays,
      myLoyaltyPageNewCustomerMessage:
        response?.data?.data?.myLoyaltyPageNewCustomerMessage,
      myPromotionPageNewCustomerMessage:
        response?.data?.data?.myPromotionPageNewCustomerMessage,
      myReferralsPageNewCustomerMessage:
        response?.data?.data?.myReferralsPageNewCustomerMessage,
      referrerLoyaltyPoints: response?.data?.data?.referrerLoyaltyPoints,
      giftCardLoyaltyAmount: response?.data?.data?.giftCardLoyaltyAmount,
      profileUpdatePoints: response?.data?.data?.updateInfoLoyaltyPoints,
    };
    return requiredRes;
  } catch (err) {
    const error = JSON.stringify(err);
    throw Error(error);
  }
};

const getAdminConfigService = { getAdminConfig };

export default getAdminConfigService;

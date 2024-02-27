import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from "./user/userDataSlice";
import notificationsSlice from "./notifications/notificationSlice";
import singleSignOnSlice from "./singleSignOn/singleSignOnSlice";
import cartSlice from "./cart/cartSlice";
import freeProductsSlice from "./marketPlace/freeProductsSlice";
import membershipSlice from "./membership/membershipSlice";
import checkoutSlice from "./checkout/checkoutSlice";
import charitySlice from "./charity/charitySlice";
import referralsSlice from "./referals/referralsSlice";
import redemptionSlice from "./redemptions/redemptionSlice";
import creditsSlice from "./credits/creditsSlice";
import loyaltyPointsSlice from "./loyaltyPoints/loyaltyPointsSlice";
import salesForceSlice from "./salesForce/SalesForceSlice";
import toggleSlice from "./toggleSlice/toggleSlice";
import giftCardSlice from "./giftCard/giftCardSlice";
import getAdminConfigSlice from "./getAdminConfig/getAdminConfigSlice";
import subscribeToNewsletterSlice from "./subscribeToNewsletter/subscribeToNewsletterSlice";
import myPromotionsSlice from "./myPromotions/myPromotionsSlice";
import themeSlice  from "./theme/themeSlice";
const store = configureStore({
  reducer: {
    user: userDataSlice,
    notifications: notificationsSlice,
    singleSignOn: singleSignOnSlice,
    cart: cartSlice,
    freeProducts: freeProductsSlice,
    membership: membershipSlice,
    checkout: checkoutSlice,
    loyaltyPoints: loyaltyPointsSlice,
    charity: charitySlice,
    referrals: referralsSlice,
    redemptions: redemptionSlice,
    credits: creditsSlice,
    salesForce: salesForceSlice,
    toggle: toggleSlice,
    giftCards: giftCardSlice,
    adminConfig: getAdminConfigSlice,
    subscribeToNewsletter: subscribeToNewsletterSlice,
    myPromotions: myPromotionsSlice,
    theme : themeSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;

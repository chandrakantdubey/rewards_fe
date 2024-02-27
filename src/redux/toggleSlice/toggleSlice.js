import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    cart: false,
    notifications: false,
    account: false,
    settings: false,
    referralModal: false,
    checkoutModal: false,
    charityModal: false,
    viewProductModal: false,
    filterOverlay: false,
    productDetails: null,
    giftCardCheckout: false,
    giftCardModal: {
      open: false,
      brand_code: null,
    },
    isSideNavExpanded: false,
    searchCard: false,
    readTerms: false,
    themeModalOpen: false,
  },
  reducers: {
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
      if (state.notifications) {
        state.account = false;
        state.settings = false;
        state.cart = false;
      }
    },
    toggleCart: (state) => {
      state.cart = !state.cart;
      if (state.cart) {
        state.account = false;
        state.settings = false;
        state.notifications = false;
      }
    },
    toggleAccount: (state) => {
      state.account = !state.account;
      if (state.account) {
        state.cart = false;
        state.settings = false;
        state.notifications = false;
      }
    },
    toggleSettings: (state) => {
      state.settings = !state.settings;
      if (state.settings) {
        state.cart = false;
        state.account = false;
        state.notifications = false;
      }
    },
    toggleReferralModal: (state) => {
      state.referralModal = !state.referralModal;
    },
    toggleCheckoutModal: (state) => {
      state.checkoutModal = !state.checkoutModal;
    },
    toggleCharityModal: (state) => {
      state.charityModal = !state.charityModal;
    },
    toggleViewProductModal: (state, action) => {
      state.viewProductModal = !state.viewProductModal;
      if (state.viewProductModal) {
        state.productDetails = action.payload;
      } else {
        state.productDetails = null;
      }
    },
    toggleFilterOverlay: (state) => {
      state.filterOverlay = !state.filterOverlay;
    },
    toggleGiftCardCheckout: (state) => {
      state.giftCardCheckout = !state.giftCardCheckout;
    },
    toggleGiftCardModal: (state, action) => {
      state.giftCardModal.open = action.payload.open;
      state.giftCardModal.brand_code = action.payload.brand_code;
    },
    toggleSideNav: (state) => {
      state.isSideNavExpanded = !state.isSideNavExpanded;
    },
    toggleSearchCard: (state) => {
      state.searchCard = !state.searchCard;
    },
    toggleReadTerms: (state) => {
      state.readTerms = !state.readTerms;
    },
    toggleThemeModalOpen: (state) => {
      state.themeModalOpen = !state.themeModalOpen;
    },
  },
});

export const {
  toggleCart,
  toggleNotifications,
  toggleAccount,
  toggleSettings,
  toggleReferralModal,
  toggleCheckoutModal,
  toggleCharityModal,
  toggleViewProductModal,
  toggleFilterOverlay,
  toggleGiftCardCheckout,
  toggleGiftCardModal,
  toggleSideNav,
  toggleSearchCard,
  toggleReadTerms,
  toggleThemeModalOpen,
} = toggleSlice.actions;

export default toggleSlice.reducer;

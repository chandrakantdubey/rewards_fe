import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: {},
  validatingAddress: false,
  termsChecked: false,
  openCheckout: false,
  orderConfirmed: false,
  currentIndex: 0,
  otp: "",
  openGiftItemCheckout: false,
  freeGiftItem: {},
  freeGiftItemCurrentIndex: 0,
  freeGiftItemSelected: "FREE_ITEM",
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setValidatingAddress: (state, action) => {
      state.isAddressSet = action.payload;
    },
    setTermsChecked: (state, action) => {
      state.termsChecked = action.payload;
    },
    setOpenCheckout: (state, action) => {
      state.openCheckout = action.payload;
    },
    setOrderConfirmed: (state, action) => {
      state.orderConfirmed = action.payload;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    setOtp: (state, action) => {
      state.currentIndex = action.payload;
    },
    setOpenGiftItemCheckout: (state, action) => {
      state.openGiftItemCheckout = action.payload;
    },
    setFreeGiftItem: (state, action) => {
      state.freeGiftItem = action.payload;
    },
    setFreeGiftItemCurrentIndex: (state, action) => {
      state.freeGiftItemCurrentIndex = action.payload;
    },
    setFreeGiftItemSelected: (state, action) => {
      state.freeGiftItemSelected = action.payload;
    },
  },
});

export const {
  setAddress,
  setValidatingAddress,
  setTermsChecked,
  setOpenCheckout,
  setOrderConfirmed,
  setCurrentIndex,
  setOtp,
  setOpenGiftItemCheckout,
  setFreeGiftItem,
  setFreeGiftItemCurrentIndex,
  setFreeGiftItemSelected,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;

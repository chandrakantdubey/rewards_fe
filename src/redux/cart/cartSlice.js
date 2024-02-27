import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartFromStorage = localStorage.getItem("cart");
const parsedCartFromStorage = cartFromStorage
  ? JSON.parse(cartFromStorage)
  : [];

const initialState = {
  cartData: {
    data: parsedCartFromStorage,
  },
  totalItems: parsedCartFromStorage.reduce(
    (total, item) => total + item.qty,
    0
  ),
  totalLoyaltyPoints: parsedCartFromStorage.reduce(
    (total, item) => total + item.loyaltyPoints * item.qty,
    0
  ),
  isGiftCard: false,
  lastAddedItem: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.isGiftCard) {
        state.isGiftCard = false;
        state.cartData.data = [];
      }
      const itemIndex = state.cartData.data.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        toast.error("Item already exists in cart.");
      } else {
        state.cartData.data.push({ ...action.payload, qty: 1 });
        state.lastAddedItem = action.payload.id;
      }

      state.totalItems = state.cartData.data.reduce(
        (total, item) => total + item.qty,
        0
      );
      state.totalLoyaltyPoints = state.cartData.data.reduce(
        (total, item) => total + item.loyaltyPoints * item.qty,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state.cartData.data));
    },
    removeFromCart: (state, action) => {
      state.cartData.data = state.cartData.data.filter(
        (item) => item.id !== action.payload.id
      );
      // Update total items and total loyalty points
      state.totalItems = state.cartData.data.reduce(
        (total, item) => total + item.qty,
        0
      );
      state.totalLoyaltyPoints = state.cartData.data.reduce(
        (total, item) => total + item.loyaltyPoints * item.qty,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state.cartData.data));
    },
    emptyCart: (state) => {
      state.cartData.data = [];
      state.totalItems = 0;
      state.totalLoyaltyPoints = 0;
      localStorage.setItem("cart", []);
    },
    addGiftCard: (state, action) => {
      if (!state.isGiftCard) {
        state.cartData.data = [];
        state.isGiftCard = true;
      }
      const giftCardIndex = state.cartData.data.findIndex(
        (item) => item.id === action.payload.id
      );

      if (giftCardIndex >= 0) {
        // remove this later and make it for product only
      } else {
        state.cartData.data.push({ ...action.payload, qty: 1 });
        state.lastAddedItem = action.payload.id;
      }

      state.totalItems = state.cartData.data.reduce(
        (total, item) => total + item.qty,
        0
      );
      state.totalLoyaltyPoints = state.cartData.data.reduce(
        (total, item) => total + item.loyaltyPoints * item.qty,
        0
      );
      state.totalActualAmountInCents = state.cartData.data.reduce(
        (total, item) => total + item.actualAmountInCents * item.qty,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state.cartData.data));
    },
    removeGiftCard: (state, action) => {
      state.cartData.data = state.cartData.data.filter(
        (item) => item.id !== action.payload.id
      );
      if (state.cartData.data.length === 0) {
        state.isGiftCard = false;
      }

      state.totalItems = state.cartData.data.reduce(
        (total, item) => total + item.qty,
        0
      );
      state.totalLoyaltyPoints = state.cartData.data.reduce(
        (total, item) => total + item.loyaltyPoints * item.qty,
        0
      );

      localStorage.setItem("cart", JSON.stringify(state.cartData.data));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  emptyCart,
  addGiftCard,
  removeGiftCard,
} = cartSlice.actions;
export default cartSlice.reducer;

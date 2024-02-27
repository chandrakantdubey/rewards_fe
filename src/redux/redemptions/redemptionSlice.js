import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import redemptionService from "./redemptionsService";

const initialState = {
  redemptionList: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    message: "",
  },
  giftRedemptionList: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    message: "",
  },
};

export const getRedemptionList = createAsyncThunk(
  "redemption/list",
  async (data, thunkAPI) => {
    try {
      return await redemptionService.getRedemptionList(data);
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getGiftRedemptionList = createAsyncThunk(
  "giftRedemption/list",
  async (data, thunkAPI) => {
    try {
      return await redemptionService.getGiftRedemptionList(data);
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const redemptionSlice = createSlice({
  name: "redemptions",
  initialState,
  reducers: {
    resetDetail: (state) => {
      state.redemptionList.isLoading = false;
      state.redemptionList.isError = false;
      state.redemptionList.isSuccess = false;
      state.redemptionList.data = null;
      state.redemptionList.message = "";
    },
    resetGiftDetail: (state) => {
      state.giftRedemptionList.isLoading = false;
      state.giftRedemptionList.isError = false;
      state.giftRedemptionList.isSuccess = false;
      state.giftRedemptionList.data = null;
      state.giftRedemptionList.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRedemptionList.pending, (state) => {
        state.redemptionList.isLoading = true;
      })
      .addCase(getRedemptionList.rejected, (state) => {
        state.redemptionList.isLoading = false;
        state.redemptionList.isError = true;
      })
      .addCase(getRedemptionList.fulfilled, (state, action) => {
        state.redemptionList.isLoading = false;
        state.redemptionList.isError = false;
        state.redemptionList.isSuccess = true;
        state.redemptionList.data = action.payload;
        // if (state.redemptionList.data && action.payload) {
        //   if (action.meta.arg.skip !== 0) {
        //     state.redemptionList.data = state.redemptionList.data.concat(
        //       action.payload
        //     );
        //   } else {
        //     state.redemptionList.data = action.payload;
        //   }
        // }
        state.redemptionList.message = "";
      })
      .addCase(getGiftRedemptionList.pending, (state) => {
        state.giftRedemptionList.isLoading = true;
      })
      .addCase(getGiftRedemptionList.rejected, (state) => {
        state.giftRedemptionList.isLoading = false;
        state.giftRedemptionList.isError = true;
      })
      .addCase(getGiftRedemptionList.fulfilled, (state, action) => {
        state.giftRedemptionList.isLoading = false;
        state.giftRedemptionList.isError = false;
        state.giftRedemptionList.isSuccess = true;
        state.giftRedemptionList.data = action.payload;
        // if (state.giftRedemptionList.data && action.payload) {
        //   if (action.meta.arg.skip !== 0) {
        //     state.giftRedemptionList.data =
        //       state.giftRedemptionList.data.concat(action.payload);
        //   } else {
        //     state.giftRedemptionList.data = action.payload;
        //   }
        // }
      });
  },
});

export const { resetDetail, resetGiftDetail } = redemptionSlice.actions;
export default redemptionSlice.reducer;

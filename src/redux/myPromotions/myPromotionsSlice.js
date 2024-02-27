import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import myPromotionsService from "./myPromotionsService";

const initialState = {
  myPromotionsListData: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: null,
    message: "",
  },
  myUSPPromotionsListData: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: null,
    message: "",
  },
};

export const getMyPromotionsList = createAsyncThunk(
  "myPromotions/list",
  async (data, thunkAPI) => {
    try {
      return await myPromotionsService.getMyPromotionsList(data);
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getMyUSPPromotionsList = createAsyncThunk(
  "myUSPPromotions/list",
  async (data, thunkAPI) => {
    try {
      return await myPromotionsService.getMyUSPPromotionsList(data);
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const myPromotionsSlice = createSlice({
  name: "myPromotions",
  initialState,
  reducers: {
    resetDetail: (state) => {
      state.myPromotionsListData.isLoading = false;
      state.myPromotionsListData.isError = false;
      state.myPromotionsListData.isSuccess = false;
      state.myPromotionsListData.data = null;
      state.myPromotionsListData.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyPromotionsList.pending, (state) => {
        state.myPromotionsListData.isLoading = true;
        state.myPromotionsListData.isError = false;
        state.myPromotionsListData.isSuccess = false;
        state.myPromotionsListData.data = null;
        state.myPromotionsListData.message = "";
      })
      .addCase(getMyPromotionsList.rejected, (state, action) => {
        state.myPromotionsListData.isLoading = false;
        state.myPromotionsListData.isError = true;
        state.myPromotionsListData.isSuccess = false;
        state.myPromotionsListData.data = null;
        state.myPromotionsListData.message = action.payload;
      })
      .addCase(getMyPromotionsList.fulfilled, (state, action) => {
        state.myPromotionsListData.isLoading = false;
        state.myPromotionsListData.isError = false;
        state.myPromotionsListData.isSuccess = true;
        state.myPromotionsListData.data = action.payload.data;
        state.myPromotionsListData.message = action.payload.message;
      })
      // USP PROMOTIONS LIST
      .addCase(getMyUSPPromotionsList.pending, (state) => {
        state.myUSPPromotionsListData.isLoading = true;
        state.myUSPPromotionsListData.isError = false;
        state.myUSPPromotionsListData.isSuccess = false;
        state.myUSPPromotionsListData.data = null;
        state.myUSPPromotionsListData.message = "";
      })
      .addCase(getMyUSPPromotionsList.rejected, (state, action) => {
        state.myUSPPromotionsListData.isLoading = false;
        state.myUSPPromotionsListData.isError = true;
        state.myUSPPromotionsListData.isSuccess = false;
        state.myUSPPromotionsListData.data = null;
        state.myUSPPromotionsListData.message = action.payload;
      })
      .addCase(getMyUSPPromotionsList.fulfilled, (state, action) => {
        state.myUSPPromotionsListData.isLoading = false;
        state.myUSPPromotionsListData.isError = false;
        state.myUSPPromotionsListData.isSuccess = true;
        state.myUSPPromotionsListData.data = action.payload.data;
        state.myUSPPromotionsListData.message = action.payload.message;
      });
  },
});

export const { resetDetail } = myPromotionsSlice.actions;
export default myPromotionsSlice.reducer;

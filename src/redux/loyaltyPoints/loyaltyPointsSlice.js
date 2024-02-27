import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loyaltyPointsService from "./loyaltyPointsService";

const initialState = {
  loyaltyPointsList: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: null,
    message: "",
  },
  loyaltyPoints: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: null,
    message: "",
  },
};

export const getLoyaltyPointsList = createAsyncThunk(
  "loyaltyPoints/list",
  async (data, thunkAPI) => {
    try {
      return await loyaltyPointsService.getLoyaltyPointsList(data);
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getLoyaltyPoints = createAsyncThunk(
  "loyaltyPoints/points",
  async (data, thunkAPI) => {
    try {
      const response = await loyaltyPointsService.getLoyaltyPoints(data);
      return response;
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loyaltyPointsSlice = createSlice({
  name: "loyaltyPoints",
  initialState,
  reducers: {
    resetDetail: (state) => {
      state.loyaltyPointsList.isLoading = false;
      state.loyaltyPointsList.isError = false;
      state.loyaltyPointsList.isSuccess = false;
      state.loyaltyPointsList.data = [];
      state.loyaltyPointsList.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoyaltyPointsList.pending, (state) => {
        state.loyaltyPointsList.isLoading = true;
      })
      .addCase(getLoyaltyPointsList.rejected, (state) => {
        state.loyaltyPointsList.isLoading = false;
        state.loyaltyPointsList.isError = true;
      })
      .addCase(getLoyaltyPointsList.fulfilled, (state, action) => {
        state.loyaltyPointsList.isLoading = false;
        state.loyaltyPointsList.isError = false;
        state.loyaltyPointsList.isSuccess = true;
        state.loyaltyPointsList.data = action.payload;
        state.loyaltyPointsList.message = "";
      })
      .addCase(getLoyaltyPoints.pending, (state) => {
        state.loyaltyPoints.isLoading = true;
      })
      .addCase(getLoyaltyPoints.rejected, (state) => {
        state.loyaltyPoints.isLoading = false;
        state.loyaltyPoints.isError = true;
      })
      .addCase(getLoyaltyPoints.fulfilled, (state, action) => {
        state.loyaltyPoints.isLoading = false;
        state.loyaltyPoints.isError = false;
        state.loyaltyPoints.isSuccess = true;
        state.loyaltyPoints.data = action.payload;
        state.loyaltyPoints.message = "";
      });
  },
});

export default loyaltyPointsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import creditsService from "./creditsService";

const initialState = {
  creditsList: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    message: "",
  },
  credits: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    message: "",
  },
};

export const getCreditsList = createAsyncThunk(
  "credits/list",
  async (data, thunkAPI) => {
    try {
      return await creditsService.getCreditsList(data);
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getCredits = createAsyncThunk(
  "credits/uspCredits",
  async (data, thunkAPI) => {
    try {
      return await creditsService.getUSPCredits();
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const creditsSlice = createSlice({
  name: "credits",
  initialState,
  reducers: {
    resetDetail: (state) => {
      state.credits.isLoading = false;
      state.credits.isError = false;
      state.credits.isSuccess = false;
      state.credits.data = null;
      state.credits.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCreditsList.pending, (state) => {
        state.creditsList.isLoading = true;
      })
      .addCase(getCreditsList.rejected, (state) => {
        state.creditsList.isLoading = false;
        state.creditsList.isError = true;
      })
      .addCase(getCreditsList.fulfilled, (state, action) => {
        state.creditsList.isLoading = false;
        state.creditsList.isError = false;
        state.creditsList.isSuccess = true;
        state.creditsList.data = action.payload;
      })
      .addCase(getCredits.pending, (state) => {
        state.credits.isLoading = true;
      })
      .addCase(getCredits.rejected, (state) => {
        state.credits.isLoading = false;
        state.credits.isError = true;
      })
      .addCase(getCredits.fulfilled, (state, action) => {
        state.credits.isLoading = false;
        state.credits.isError = false;
        state.credits.isSuccess = true;
        state.credits.data = action.payload;
      });
  },
});

export default creditsSlice.reducer;

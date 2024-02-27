import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import charityService from "./charityService";

const initialState = {
  charityList: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    message: "",
  },
  preferedCharityList: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    message: "",
  },
  donationsList: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    message: "",
  },
  charityCategoryList: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    message: "",
  },
};

export const getCharityList = createAsyncThunk(
  "charity/charityList",
  async (data, thunkAPI) => {
    try {
      const response = await charityService.getCharityList(data);
      return response;
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPreferedCharityList = createAsyncThunk(
  "charity/prefferredCharityList",
  async (data, thunkAPI) => {
    try {
      const response = await charityService.getPreferedCharityList(data);
      return response;
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getDonationsList = createAsyncThunk(
  "charity/donationsList",
  async (data, thunkAPI) => {
    try {
      return await charityService.getDonationsList(data);
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCategoryCharityList = createAsyncThunk(
  "charity/categoryCharityList",
  async (data, thunkAPI) => {
    try {
      return await charityService.getCategoryCharityList(data);
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const charitySlice = createSlice({
  name: "charity",
  initialState,
  reducers: {
    resetDetail: (state) => {
      state.donationsList.data = null;
    },
    resetCharityDetail: (state) => {
      state.charityList.data = initialState.charityList.data;
    },
    setSortedCharityList: (state, action) => {
      state.charityList.data = [...state.charityList.data].sort((a, b) => {
        if (a[action.payload] < b[action.payload]) {
          return -1;
        }
        if (a[action.payload] > b[action.payload]) {
          return 1;
        }
        return 0;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDonationsList.pending, (state) => {
        state.donationsList.isLoading = true;
      })
      .addCase(getDonationsList.rejected, (state) => {
        state.donationsList.isLoading = false;
        state.donationsList.isError = true;
        state.donationsList.isSuccess = false;
        state.donationsList.data = null;
        state.donationsList.message = "";
      })
      .addCase(getDonationsList.fulfilled, (state, action) => {
        state.donationsList.isLoading = false;
        state.donationsList.isError = false;
        state.donationsList.isSuccess = true;
        state.donationsList.data = action.payload;
        state.donationsList.message = "";
      })
      .addCase(getCharityList.pending, (state) => {
        state.charityList.isLoading = true;
      })
      .addCase(getCharityList.fulfilled, (state, action) => {
        state.charityList.isLoading = false;
        state.charityList.isSuccess = true;
        state.charityList.data = action.payload.loadMore
          ? state.charityList.data.concat(action.payload.result)
          : action.payload.result;
      })
      .addCase(getCharityList.rejected, (state, action) => {
        state.charityList.isLoading = false;
        state.charityList.isError = true;
        state.charityList.message = action.error.message;
      })
      .addCase(getCategoryCharityList.pending, (state) => {
        state.charityCategoryList.isLoading = true;
        state.charityCategoryList.isSuccess = false;
        state.charityCategoryList.isError = false;
      })
      .addCase(getCategoryCharityList.fulfilled, (state, action) => {
        state.charityCategoryList.isLoading = false;
        state.charityCategoryList.isSuccess = true;
        state.charityCategoryList.data = action.payload;
      })
      .addCase(getCategoryCharityList.rejected, (state, action) => {
        state.charityCategoryList.isLoading = false;
        state.charityCategoryList.isError = true;
        state.charityCategoryList.message = action.payload;
      })
      .addCase(getPreferedCharityList.pending, (state) => {
        state.preferedCharityList.isLoading = true;
        state.preferedCharityList.isSuccess = false;
        state.preferedCharityList.isError = false;
      })
      .addCase(getPreferedCharityList.fulfilled, (state, action) => {
        state.preferedCharityList.isLoading = false;
        state.preferedCharityList.isSuccess = true;
        state.preferedCharityList.data = action.payload;
      })
      .addCase(getPreferedCharityList.rejected, (state, action) => {
        state.preferedCharityList.isLoading = false;
        state.preferedCharityList.isError = true;
        state.preferedCharityList.message = action.payload;
      });
  },
});

export const { resetDetail, resetCharityDetail, setSortedCharityList } =
  charitySlice.actions;
export default charitySlice.reducer;

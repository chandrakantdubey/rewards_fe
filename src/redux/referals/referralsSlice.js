import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import referralsService from "./referralsService";

const initialState = {
  referralsList: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    message: "",
  },
};

export const getReferralsList = createAsyncThunk(
  "referrals/list",
  async (data, thunkAPI) => {
    try {
      return await referralsService.getReferralsList(data);
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const referralsSlice = createSlice({
  name: "referrals",
  initialState,
  reducers: {
    resetDetail: (state) => {
      state.referralsList.isLoading = false;
      state.referralsList.isError = false;
      state.referralsList.isSuccess = false;
      state.referralsList.data = null;
      state.referralsList.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReferralsList.pending, (state) => {
        state.referralsList.isLoading = true;
      })
      .addCase(getReferralsList.rejected, (state, action) => {
        state.referralsList.isLoading = false;
        state.referralsList.isError = true;
        state.referralsList.message = action.payload;
      })
      .addCase(getReferralsList.fulfilled, (state, action) => {
        state.referralsList.isLoading = false;
        state.referralsList.isError = false;
        state.referralsList.isSuccess = true;
        state.referralsList.data = action.payload;
        // if (state.referralsList.data && action.payload) {
        //   if (action.meta.arg.skip !== 0) {
        //     state.referralsList.data = state.referralsList.data.concat(
        //       action.payload
        //     );
        //   } else {
        //     state.referralsList.data = action.payload;
        //   }
        // }
        if (action.payload && action.payload.result) {
          state.referralsList.successfulReferralsCount =
            action.payload.result.filter(
              (referral) => referral.loyaltyPointsEarned > 0
            ).length;
        }
      });
  },
});

export const { resetDetail } = referralsSlice.actions;
export default referralsSlice.reducer;

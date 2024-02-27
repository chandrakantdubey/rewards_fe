import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSalesForceDataService } from "./SalesForceServices";

export const getSalesForceData = createAsyncThunk(
  "salesforce/getSalesForceData",
  async (userId, thunkAPI) => {
    try {
      return await getSalesForceDataService(userId);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  userInfoData: {
    error: null,
    status: "idle",
    data: {
      companyInfo: {},
      contactInfo: {},
      contactData: {},
      profileImage: "",
    },
    message: "",
    profileCompletion: 0,
  },
};

export const salesForceSlice = createSlice({
  name: "salesforce",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSalesForceData.fulfilled, (state, { payload }) => {
      state.userInfoData.error = null;
      state.userInfoData.status = "succeeded";
      state.userInfoData.data = payload;
      // Calculate profile completion
      const propertiesToCheck = [
        "companyCity",
        "description",
        "domain",
        "facebookHandle",
        "industry",
        "industryGroup",
        "legalName",
        "linkedInHandle",
        "country",
        "sector",
        "NAICS_Code",
        "state",
        "streetName",
        "type",
        "postalCode",
        "twitterHandle",
        "username",
        "email",
      ];
      let filledProperties = 0;
      propertiesToCheck.forEach((property) => {
        if (
          state.userInfoData?.data?.companyInfo?.[property] &&
          state.userInfoData?.data?.companyInfo?.[property].trim() !== ""
        ) {
          filledProperties++;
        }
      });

      state.userInfoData.profileCompletion =
        ((filledProperties + 2) / propertiesToCheck.length) * 100;
    });
    builder.addCase(getSalesForceData.pending, (state, payload) => {
      state.userInfoData.status = "loading";
      state.userInfoData.data = initialState.userInfoData.data;
      state.userInfoData.error = null;
    });
    builder.addCase(getSalesForceData.rejected, (state, { payload }) => {
      state.userInfoData.status = "failed";
      state.userInfoData.data = initialState.userInfoData.data;
      state.userInfoData.error = payload;
    });
  },
});

export const {} = salesForceSlice.actions;

export default salesForceSlice.reducer;

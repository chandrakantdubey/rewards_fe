import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userDataService from "./userDataService";

const initialState = {
  userData: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    message: "",
    profileCompletion: 0,
  },
};

export const getUserData = createAsyncThunk(
  "user/information",
  async (azureId, thunkAPI) => {
    try {
      const response = await userDataService(azureId);
      return response;
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.userData.isLoading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData.isLoading = false;
        state.userData.isSuccess = true;
        state.userData.data = action.payload;
        // Calculate profile completion
        const propertiesToCheck = [
          "name",
          "last_name",
          "email",
          "phoneNumber",
          "address",
          "city",
          "state",
          "country",
          "postalCode",
          "company_name",
        ];

        let filledProperties = 0;

        propertiesToCheck.forEach((property) => {
          if (
            state.userData.data.data[property] &&
            state.userData.data.data[property].trim() !== ""
          ) {
            filledProperties++;
          }
        });

        state.userData.profileCompletion =
          (filledProperties / propertiesToCheck.length) * 100;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.userData.isLoading = false;
        state.userData.isError = true;
        state.userData.message = action.error.message;
      });
  },
});

export default userDataSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMembershipService } from "./membershipService";

export const getMembershipData = createAsyncThunk(
  "membership/information",
  async (_, thunkAPI) => {
    try {
      return await getMembershipService();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  error: null,
  status: "idle",
  data: [],
  message: "",
};

export const membershipSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMembershipData.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.data = payload;
      state.error = null;
    });
    builder.addCase(getMembershipData.pending, (state, { payload }) => {
      state.status = "loading";
      state.data = [];
      state.error = null;
    });
    builder.addCase(getMembershipData.rejected, (state, { payload }) => {
      state.status = "failed";
      state.data = [];
      state.error = payload;
    });
  },
});
export default membershipSlice.reducer;

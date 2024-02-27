import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import singleSignOnService from "./singleSignOnService";

const initialState = {
  singleSignOn: {
    data: null,
  },
  socketDataValue: "",
  instanceData: null,
  loginData: {
    isLoading: false,
    isError: false,
    data: null,
  },
};

export const loginUser = createAsyncThunk(
  "login/user",
  async (creadPayload, thunkAPI) => {
    try {
      return await singleSignOnService.loginUser(creadPayload);
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const singleSignOnSlice = createSlice({
  name: "singleSignOn",
  initialState,
  reducers: {
    resetSingleSignOn: (state) => {
      state.singleSignOn.data = null;
    },
    setSingleSignOn: (state, action) => {
      state.singleSignOn.data = action.payload;
    },
    resetSocketDataValue: (state) => {
      state.socketDataValue = null;
    },
    setSocketDataValue: (state, action) => {
      state.socketDataValue = action.payload;
    },
    setInstance: (state, action) => {
      state.instanceData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loginData.isLoading = true;
        state.loginData.data = null;
        state.loginData.isError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginData.isLoading = false;
        state.loginData.isError = false;
        state.loginData.data = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginData.isLoading = false;
        state.loginData.isError = false;
        state.loginData.data = action.payload;
      });
  },
});

export const {
  resetSingleSignOn,
  setSingleSignOn,
  resetSocketDataValue,
  setSocketDataValue,
  setInstance,
} = singleSignOnSlice.actions;
export default singleSignOnSlice.reducer;

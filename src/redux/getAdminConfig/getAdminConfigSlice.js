import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import getAdminConfigService from "./getAdminConfigService";

const initialState = {
  adminConfigData: {
    isAdminConfigLoading: false,
    isAdminConfigSuccess: false,
    isAdminConfigError: false,
    configdata: null,
    configMessage: "",
  },
};

export const getAdminConfig = createAsyncThunk(
  "getAdminConfig/data",
  async (data, thunkAPI) => {
    try {
      return await getAdminConfigService.getAdminConfig(data);
    } catch (error) {
      const message = JSON.parse(error?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAdminConfigSlice = createSlice({
  name: "getAdminConfig",
  initialState,
  reducers: {
    resetDetail: (state) => {
      state.adminConfigData.isAdminConfigLoading = false;
      state.adminConfigData.isAdminConfigError = false;
      state.adminConfigData.isAdminConfigSuccess = false;
      state.adminConfigData.configData = null;
      state.adminConfigData.configMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAdminConfig.pending, (state) => {
        state.adminConfigData.isAdminConfigLoading = true;
        state.adminConfigData.isAdminConfigError = false;
        state.adminConfigData.isAdminConfigSuccess = false;
        state.adminConfigData.data = null;
        state.adminConfigData.configMessage = "";
      })
      .addCase(getAdminConfig.rejected, (state) => {
        state.adminConfigData.isAdminConfigLoading = false;
        state.adminConfigData.isAdminConfigError = true;
        state.adminConfigData.isAdminConfigSuccess = false;
        state.adminConfigData.configData = null;
        state.adminConfigData.configMessage = "";
      })
      .addCase(getAdminConfig.fulfilled, (state, action) => {
        state.adminConfigData.isAdminConfigLoading = false;
        state.adminConfigData.isAdminConfigError = false;
        state.adminConfigData.isAdminConfigSuccess = true;
        state.adminConfigData.configData = action.payload;
        state.adminConfigData.configMessage = "";
      });
  },
});

export const { resetDetail } = getAdminConfigSlice.actions;
export default getAdminConfigSlice.reducer;

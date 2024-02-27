import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  subscribeToNewsLetterService,
  subscribeToNewsLetterStatusService,
  termsAndConditionsService,
} from "./subscribeToNewsletterService";

export const getSubscribeToNewsletterStatus = createAsyncThunk(
  "subscribeToNewsletter/getStatus",
  async (email, thunkAPI) => {
    try {
      return await subscribeToNewsLetterStatusService(email);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getSubscribeToNewsletter = createAsyncThunk(
  "subscribeToNewsletter/subscribe",
  async (email, thunkAPI) => {
    try {
      return await subscribeToNewsLetterService(email);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getTermsAndConditions = createAsyncThunk(
  "subscribeToNewsletter/terms",
  async (_, thunkAPI) => {
    try {
      return await termsAndConditionsService();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState = {
  subscribeToNewsletterData: {
    status: "",
    error: null,
    data: null,
  },
  terms: {
    status: "",
    error: null,
    data: null,
  },
};

export const subscribeToNewsletter = createSlice({
  name: "subscribeToNewsletter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getSubscribeToNewsletter.fulfilled,
      (state, { payload }) => {
        state.subscribeToNewsletterData.data = payload;
        state.subscribeToNewsletterData.error = null;
        state.subscribeToNewsletterData.status = "success";
      }
    );
    builder.addCase(getSubscribeToNewsletter.pending, (state, payload) => {
      state.subscribeToNewsletterData.status = "loading";
    });
    builder.addCase(getSubscribeToNewsletter.rejected, (state, { payload }) => {
      state.subscribeToNewsletterData.status = "failed";
    });
    builder.addCase(
      getSubscribeToNewsletterStatus.fulfilled,
      (state, { payload }) => {
        state.subscribeToNewsletterData.data = payload;
        state.subscribeToNewsletterData.error = null;
        state.subscribeToNewsletterData.status = "success";
      }
    );
    builder.addCase(
      getSubscribeToNewsletterStatus.pending,
      (state, payload) => {
        state.subscribeToNewsletterData.status = "loading";
      }
    );
    builder.addCase(
      getSubscribeToNewsletterStatus.rejected,
      (state, { payload }) => {
        state.subscribeToNewsletterData.status = "failed";
      }
    );
    builder.addCase(getTermsAndConditions.fulfilled, (state, { payload }) => {
      state.terms.data = payload;
      state.terms.error = null;
      state.terms.status = "success";
    });
    builder.addCase(getTermsAndConditions.pending, (state, payload) => {
      state.terms.status = "loading";
    });
    builder.addCase(getTermsAndConditions.rejected, (state, { payload }) => {
      state.terms.status = "failed";
    });
  },
});

export default subscribeToNewsletter.reducer;

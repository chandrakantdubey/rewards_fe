import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getGiftCardService, getGiftCardByIdService } from "./giftCardService";

const initialState = {
  giftCard: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    message: "",
    totalCount: null,
  },
  giftCardById: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    message: "",
  },
};

export const getGiftCard = createAsyncThunk(
  "giftCard/getGiftCard",
  async (data, thunkAPI) => {
    try {
      return await getGiftCardService(data);
    } catch (err) {
      const message = JSON.parse(err?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getGiftCardById = createAsyncThunk(
  "giftCard/getGiftCardById",
  async (data, thunkAPI) => {
    try {
      return await getGiftCardByIdService(data);
    } catch (err) {
      const message = JSON.parse(err?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const giftCardSlice = createSlice({
  name: "giftCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGiftCard.pending, (state) => {
        state.giftCard.isLoading = true;
      })
      .addCase(getGiftCard.fulfilled, (state, action) => {
        state.giftCard.isLoading = false;
        state.giftCard.isSuccess = true;
        if (state.giftCard.data && action.payload) {
          if (action.meta.arg.offset !== 0) {
            state.giftCard.data = state.giftCard.data.concat(
              action.payload?.brands
            );
          } else {
            state.giftCard.data = action.payload?.brands;
          }
        }
        state.giftCard.totalCount = action.payload?.total_count;
      })
      .addCase(getGiftCard.rejected, (state, action) => {
        state.giftCard.isLoading = false;
        state.giftCard.isError = true;
        state.giftCard.message = action.error.message;
      })
      .addCase(getGiftCardById.pending, (state) => {
        state.giftCardById.isLoading = true;
      })
      .addCase(getGiftCardById.fulfilled, (state, action) => {
        state.giftCardById.isLoading = false;
        state.giftCardById.isSuccess = true;
        state.giftCardById.data = action.payload;
      })
      .addCase(getGiftCardById.rejected, (state, action) => {
        state.giftCardById.isLoading = false;
        state.giftCardById.isError = true;
        state.giftCardById.message = action.error.message;
      });
  },
});
export default giftCardSlice.reducer;

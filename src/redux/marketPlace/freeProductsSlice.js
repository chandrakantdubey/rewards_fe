import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getBrandsService,
  getCategoriesService,
  getFreeGiftItemsService,
  getFreeProductsService,
} from "./freeProductsService";

const initialState = {
  freeProducts: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    message: "",
    totalCount: null,
  },
  brands: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    message: "",
  },
  categories: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    message: "",
  },
  freeGiftItems: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
    message: "",
  },
};

export const getFreeProducts = createAsyncThunk(
  "freeProducts/getFreeProducts",
  async (data, thunkAPI) => {
    try {
      return await getFreeProductsService(data);
    } catch (err) {
      const message = JSON.parse(err?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBrands = createAsyncThunk(
  "freeProducts/getBrands",
  async (data, thunkAPI) => {
    try {
      return await getBrandsService(data);
    } catch (err) {
      const message = JSON.parse(err?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "freeProducts/getCategories",
  async (data, thunkAPI) => {
    try {
      return await getCategoriesService(data);
    } catch (err) {
      const message = JSON.parse(err?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getFreeGiftItems = createAsyncThunk(
  "freeProducts/getFreeGiftItems",
  async (data, thunkAPI) => {
    try {
      return await getFreeGiftItemsService(data);
    } catch (err) {
      const message = JSON.parse(err?.message)?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const freeProductsSlice = createSlice({
  name: "freeProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFreeProducts.pending, (state) => {
        state.freeProducts.isLoading = true;
      })
      .addCase(getFreeProducts.fulfilled, (state, action) => {
        state.freeProducts.isLoading = false;
        state.freeProducts.isSuccess = true;
        if (state.freeProducts.data && action.payload) {
          if (action.meta.arg.skip !== 0) {
            state.freeProducts.data = state.freeProducts.data.concat(
              action.payload?.result
            );
          } else {
            state.freeProducts.data = action.payload?.result;
          }
        }
        state.freeProducts.totalCount = action.payload?.totalCount;
      })
      .addCase(getFreeProducts.rejected, (state, action) => {
        state.freeProducts.isLoading = false;
        state.freeProducts.isError = true;
        state.freeProducts.message = action.error.message;
      })
      .addCase(getBrands.pending, (state) => {
        state.brands.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.brands.isLoading = false;
        state.brands.isSuccess = true;
        state.brands.data = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.brands.isLoading = false;
        state.brands.isError = true;
        state.brands.message = action.error.message;
      })
      .addCase(getCategories.pending, (state) => {
        state.categories.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories.isLoading = false;
        state.categories.isSuccess = true;
        state.categories.data = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.categories.isLoading = false;
        state.categories.isError = true;
        state.categories.message = action.error.message;
      })
      .addCase(getFreeGiftItems.pending, (state) => {
        state.freeGiftItems.isLoading = true;
      })
      .addCase(getFreeGiftItems.fulfilled, (state, action) => {
        state.freeGiftItems.isLoading = false;
        state.freeGiftItems.isSuccess = true;
        // if (state.freeGiftItems.data && action.payload) {
        //   if (action.meta.arg.skip !== 0) {
        //     state.freeGiftItems.data = state.freeGiftItems.data.concat(
        //       action.payload?.result
        //     );
        //   } else {
        state.freeGiftItems.data = action.payload;
        //   }
        // }
        state.freeGiftItems.totalCount = action.payload?.totalCount;
      })
      .addCase(getFreeGiftItems.rejected, (state, action) => {
        state.freeGiftItems.isLoading = false;
        state.freeGiftItems.isError = true;
        state.freeGiftItems.message = action.error.message;
      });
  },
});
export default freeProductsSlice.reducer;

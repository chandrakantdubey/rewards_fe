import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllNotificationsService,
  getUnseenNotificationsService,
  getDoNotdisturbState,
  updateDoNotdisturbState,
} from "./notificationService";
import { getAzureId } from "../../auth/getAzureId";
import notificationApi from "../../api/notificationApi";

const initialState = {
  unseenNotifications: {
    error: null,
    status: "idle",
    data: [],
  },
  allNotifications: {
    error: null,
    status: "idle",
    data: { data: [], count: 0 },
  },
  toggleNotification: {
    error: null,
    status: "idle",
    data: false,
  },
};

export const getUnseenNotifications = createAsyncThunk(
  "notifications/fetchUnseenNotifications",
  async (userId, thunkAPI) => {
    try {
      return await getUnseenNotificationsService();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const getAllNotifications = createAsyncThunk(
  "notifications/fetchAllNotifications",
  async (pagination, thunkAPI) => {
    try {
      return await getAllNotificationsService(pagination);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
export const markNotificationRead = createAsyncThunk(
  "notifications/markNotificationRead",
  async (value, thunkAPI) => {
    try {
      const res = await notificationApi.post(`/read`, {
        userid: getAzureId(),
        notification_id: value?.id,
      });
      if (res?.data?.message?.includes("successfully")) {
        thunkAPI.dispatch(getUnseenNotifications());
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const dismissAllNotification = createAsyncThunk(
  "notifications/dismissAllNotification",
  async (_, thunkAPI) => {
    try {
      const res = await notificationApi.post(`/dismiss_all`, {
        userid: getAzureId(),
      });
      if (res?.data?.message?.includes("successfully")) {
        thunkAPI.dispatch(getUnseenNotifications());
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getDoNotdisturbStateThunk = createAsyncThunk(
  "notifications/getDoNotdisturbState",
  async (_, thunkAPI) => {
    try {
      const res = await getDoNotdisturbState();
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateDoNotdisturbStateThunk = createAsyncThunk(
  "notifications/updateDoNotdisturbState",
  async (value, thunkAPI) => {
    try {
      const res = await updateDoNotdisturbState(value);
      thunkAPI.dispatch(getDoNotdisturbStateThunk());
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUnseenNotifications.fulfilled, (state, { payload }) => {
      state.unseenNotifications.data = payload || [];
      state.unseenNotifications.error = null;
      state.unseenNotifications.status = "succeeded";
    });
    builder.addCase(getUnseenNotifications.pending, (state, { payload }) => {
      state.unseenNotifications.status = "loading";
    });
    builder.addCase(getUnseenNotifications.rejected, (state, { payload }) => {
      state.unseenNotifications.status = "failed";
      state.unseenNotifications.error = payload;
    });
    builder.addCase(getAllNotifications.fulfilled, (state, { payload }) => {
      state.allNotifications.data =
        payload || initialState.allNotifications.data;
      state.allNotifications.error = null;
      state.allNotifications.status = "succeeded";
    });
    builder.addCase(getAllNotifications.pending, (state, { payload }) => {
      state.allNotifications.status = "loading";
      state.allNotifications.error = null;
    });
    builder.addCase(getAllNotifications.rejected, (state, { payload }) => {
      state.allNotifications.status = "failed";
      state.allNotifications.error = payload;
    });
    builder.addCase(
      getDoNotdisturbStateThunk.fulfilled,
      (state, { payload }) => {
        state.toggleNotification.data =
          payload || initialState.toggleNotification.data;
        state.toggleNotification.error = null;
        state.toggleNotification.status = "succeeded";
      }
    );
    builder.addCase(getDoNotdisturbStateThunk.pending, (state, { payload }) => {
      state.toggleNotification.status = "loading";
      state.toggleNotification.data = initialState.toggleNotification.data;
      state.toggleNotification.error = null;
    });
    builder.addCase(
      getDoNotdisturbStateThunk.rejected,
      (state, { payload }) => {
        state.toggleNotification.status = "failed";
        state.toggleNotification.data = initialState.toggleNotification.data;
        state.toggleNotification.error = payload;
      }
    );
  },
});

export default notificationsSlice.reducer;

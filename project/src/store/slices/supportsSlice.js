import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import supportAPI from "../../api/support";

export const sendSupport = createAsyncThunk(
  "supportsSlice/sendSupport",
  async (support) => {
    try {
      const resutl = await supportAPI.send(support);
      return resutl.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

const supportsSlice = createSlice({
  name: "supportsSlice",
  initialState: {
    supports: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Send support
    [sendSupport.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [sendSupport.fulfilled]: (state, action) => {
      message.success("Sent support successfully!");
      state.isLoading = false;
      state.hasError = false;
    },
    [sendSupport.rejected]: (state, action) => {
      message.error(
        `Sent appointment failed due to ${action.error.message}`,
        3
      );
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selector

export const selectSupportIsLoading = (state) => state.supports.isLoading;

export default supportsSlice.reducer;

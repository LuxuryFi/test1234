import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import orderAPI from "../../api/payment";

export const fetchPayments = createAsyncThunk(
  "paymentsSlice/fetchPayments",
  async () => {
    try {
      const result = await orderAPI.getAll();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchWatch = createAsyncThunk(
  "paymentsSlice/fetchWatch",
  async () => {
    try {
      const result = await orderAPI.getWatch();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchFavorite = createAsyncThunk(
  "paymentsSlice/fetchFavorite",
  async () => {
    try {
      const result = await orderAPI.getFavorite();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchPayment = createAsyncThunk(
  "paymentsSlice/fetchPayment",
  async (order_id) => {
    try {
      const result = await orderAPI.getOne(order_id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchDetails = createAsyncThunk(
  "paymentsSlice/fetchDetails",
  async (order_id) => {
    try {
      const result = await orderAPI.getDetails(order_id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

// Book store

export const createPayment = createAsyncThunk(
  "paymentsSlice/createPayment",
  async () => {
    try {
      const result = await orderAPI.addPayment();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const confirmPayment = createAsyncThunk(
  'paymentsSlice/confirmPayment',
  async (payment) => {
    try {
      const result = await orderAPI.confirmPayment(payment);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

// Reducer
const paymentsSlice = createSlice({
  name: "paymentsSlice",
  initialState: {
    payments: [],
    details: [],
    paymentNeedUpdate: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Fetch Payments
    [fetchPayments.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchPayments.fulfilled]: (state, action) => {
      state.payments = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchPayments.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Payment
    [fetchPayment.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchPayment.fulfilled]: (state, action) => {
      state.paymentNeedUpdate = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchPayment.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },

    // Fetch Detail
    [fetchWatch.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchWatch.fulfilled]: (state, action) => {
      state.watches = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchWatch.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    [fetchFavorite.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchFavorite.fulfilled]: (state, action) => {
      state.favorites = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchFavorite.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Detail
    [fetchDetails.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchDetails.fulfilled]: (state, action) => {
      state.details = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchDetails.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Book Store
    // Add payment
    [createPayment.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createPayment.fulfilled]: (state, action) => {
      state.payments = action.payload;
      message.success("Added payment successfully!", 3);
      // setTimeout(() => {
      //   window.location.href = "";
      // }, 1000)
      state.isLoading = false;
      state.hasError = false;
    },
    [createPayment.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },

    [confirmPayment.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [confirmPayment.fulfilled]: (state, action) => {
      message.success('Order payment has been created successfully!', 3);
      state.urlPayment = action.payload;
      setTimeout(() => {
        window.open(action.payload);
      }, 1000);
      state.isLoading = false;
      state.hasError = false;
    },
    [confirmPayment.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selector
export const selectPayments = (state) => state.payments.payments;

export const selectWatches = (state) => state.payments.watches;

export const selectFavorites = (state) => state.payments.favorites;

export const selectDetails = (state) => state.payments.details;

export const selectPaymentNeedUpdate = (state) =>
  state.payments.paymentNeedUpdate;

export const selectPaymentIsLoading = (state) => state.payments.isLoading;

export default paymentsSlice.reducer;

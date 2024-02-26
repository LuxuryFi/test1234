import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import cartAPI from "../../api/cart";

export const addItemToCart = createAsyncThunk(
  "cartSlice/addItemToCart",
  async (newItem) => {
    try {
      const result = await cartAPI.addItem(newItem);
      return newItem;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchCart = createAsyncThunk("cartSlice/fetchCart", async () => {
  try {
    const result = await cartAPI.fetchCart();
    return result.data.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const updateItemInCart = createAsyncThunk(
  "cartSlice/updateItemInCart",
  async (data) => {
    try {
      const { amount, item } = data;
      const result = await cartAPI.updateItem({
        amount,
        cart_id: item.cart_id,
      });
      return {
        data: result.data.data,
        item: {
          ...item,
          amount: amount,
        },
      };
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const deleteItemInCart = createAsyncThunk(
  "cartSlice/deleteItemInCart",
  async (cart_id) => {
    try {
      const result = await cartAPI.deleteItem(cart_id);
      return cart_id;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

// Reducer
const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    items: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Add item
    [addItemToCart.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [addItemToCart.fulfilled]: (state, action) => {
      state.items = action.payload;
      message.success("Added item to cart successfully!", 3);
      state.isLoading = false;
      state.hasError = false;
    },
    [addItemToCart.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Cart
    [fetchCart.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchCart.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchCart.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update Item In Cart
    [updateItemInCart.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateItemInCart.fulfilled]: (state, action) => {
      message.success("Updated item successfully", 3);
      state.items.find((item, index) => {
        if (item.product_id === action.payload.item.product_id) {
          state.items[index].amount = action.payload.item.amount;
          return true;
        }
        return false;
      });

      state.isLoading = false;
      state.hasError = false;
    },
    [updateItemInCart.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete Item In Cart
    [deleteItemInCart.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteItemInCart.fulfilled]: (state, action) => {
      state.items = state.items.filter(
        (item) => item.cart_id !== action.payload
      );
      message.success("Deleted item successfully", 3);

      state.isLoading = false;
      state.hasError = false;
    },
    [deleteItemInCart.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selector
export const selectAllItemInCart = (state) => state.cart.items;

export const selectCartIsLoading = (state) => state.cart.isLoading;

export default cartSlice.reducer;

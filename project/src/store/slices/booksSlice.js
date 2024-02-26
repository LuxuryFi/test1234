import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import bookAPI from "../../api/book";

export const fetchAll = createAsyncThunk("booksSlice/fetchAll", async () => {
  try {
    const result = await bookAPI.getAll();
    return result.data.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const addWatch = createAsyncThunk(
  "booksSlice/addWatch",
  async (book_id) => {
    try {
      const result = await bookAPI.addWatch({
        product_id: book_id,
      });
      return {
        data: result.data.data,
        product_id: book_id,
      };
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const addFavorite = createAsyncThunk(
  "booksSlice/addFavorite",
  async (book_id) => {
    try {
      const result = await bookAPI.addFavorite({
        product_id: book_id,
      });
      return {
        data: result.data.data,
        product_id: book_id,
      };
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const checkBook = createAsyncThunk(
  "booksSlice/checkBook",
  async (book_id) => {
    try {
      const result = await bookAPI.checkBook(book_id);
      return {
        data: result.data.data,
        product_id: book_id,
      };
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchTrending = createAsyncThunk(
  "booksSlice/fetchTrending",
  async () => {
    try {
      const result = await bookAPI.getTrending();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchOneBook = createAsyncThunk(
  "booksSlice/fetchOneBook",
  async (book_id) => {
    try {
      const result = await bookAPI.getOne(book_id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchBestSeller = createAsyncThunk(
  "booksSlice/fetchBestSeller",
  async () => {
    try {
      const result = await bookAPI.getBestSeller();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchNewest = createAsyncThunk(
  "booksSlice/fetchNewest",
  async () => {
    try {
      const result = await bookAPI.getNewest();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const commentBook = createAsyncThunk(
  "booksSlice/commentBook",
  async (data) => {
    try {
      const result = await bookAPI.commentBook(data);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchComment = createAsyncThunk(
  "booksSlice/fetchComment",
  async (book_id) => {
    try {
      const result = await bookAPI.getComment(book_id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchAllCategoryBook = createAsyncThunk(
  "booksSlice/fetchAllCategoryBook",
  async () => {
    try {
      const result = await bookAPI.getAllCategory();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

// Reducer
const booksSlice = createSlice({
  name: "booksSlice",
  initialState: {
    books: [],
    favorite: [],
    watch: [],
    bookCategory: [],
    trendingBooks: [],
    bestSellerBooks: [],
    newestBooks: [],
    bookNeedUpdate: {},
    searchTerm: "",
    searchCategory: "",
    isLoading: false,
    hasError: false,
  },
  reducers: {
    changeSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    changeSearchCategory: (state, action) => {
      state.searchCategory = action.payload;
    },
  },
  extraReducers: {
    // Fetch All
    [fetchAll.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchAll.fulfilled]: (state, action) => {
      let arr = [
        ...action.payload,
        ...action.payload.sort(() => Math.random() - 0.5),
      ];
      state.books = arr;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchAll.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Trending
    [fetchTrending.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchTrending.fulfilled]: (state, action) => {
      state.trendingBooks = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchTrending.rejected]: (state, action) => {
      // message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Best Seller
    [fetchBestSeller.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchBestSeller.fulfilled]: (state, action) => {
      state.bestSellerBooks = [...action.payload];
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchBestSeller.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Newest
    [fetchNewest.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchNewest.fulfilled]: (state, action) => {
      state.newestBooks = [...action.payload];
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchNewest.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch One Book
    [fetchOneBook.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchOneBook.fulfilled]: (state, action) => {
      state.bookNeedUpdate = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchOneBook.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Checkbook
    [checkBook.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [checkBook.fulfilled]: (state, action) => {
      const watch = action.payload.data.watch;
      const favorite = action.payload.data.favorite;

      if (action.payload.data.watch) {
        if (!state.watch.includes(watch)) state.watch.push(watch);
      }

      if (action.payload.data.favorite) {
        if (!state.watch.includes(favorite)) state.watch.push(favorite);
      }

      state.isLoading = false;
      state.hasError = false;
    },
    [checkBook.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Add watch
    [addWatch.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [addWatch.fulfilled]: (state, action) => {
      const watch = action.payload.product_id;

      if (!state.watch.includes(watch)) state.watch.push(watch);

      message.success("Subscribe to this item successfully");

      state.isLoading = false;
      state.hasError = false;
    },
    [addWatch.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Add Favorite
    [addFavorite.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [addFavorite.fulfilled]: (state, action) => {
      const favorite = action.payload.product_id;

      if (!state.favorite.includes(favorite)) state.favorite.push(favorite);

      message.success("Added favorite to this item successfully");
      state.isLoading = false;
      state.hasError = false;
    },
    [addFavorite.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // CommentBook
    [commentBook.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [commentBook.fulfilled]: (state, action) => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      state.bookNeedUpdate.comments.unshift({
        ...action.payload,
        avatar: currentUser.avatar,
        full_name: currentUser.first_name + " " + currentUser.last_name,
      });

      message.success("Added comment to this item successfully");
      state.isLoading = false;
      state.hasError = false;
    },
    [commentBook.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // fetch all category book
    [fetchAllCategoryBook.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchAllCategoryBook.fulfilled]: (state, action) => {
      state.bookCategory = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchAllCategoryBook.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selector
export const selectBooks = (state) => state.books.books;

export const selectTrendingBooks = (state) => state.books.trendingBooks;

export const selectCategoryBook = (state) => state.books.bookCategory;

export const selectBestSellerBooks = (state) => state.books.bestSellerBooks;

export const selectNewestBooks = (state) => state.books.newestBooks;

export const selectBookNeedUpdate = (state) => state.books.bookNeedUpdate;

export const selectBookWatch = (state) => state.books.watch;

export const selectBookFavorite = (state) => state.books.favorite;

export const selectBookIsLoading = (state) => state.books.isLoading;

export const selectSearchTerm = (state) => state.books.searchTerm;

export const selectSearchCategory = (state) => state.books.searchCategory;

export const selectFilteredBookGrid = (state) => {
  const searchCategory = selectSearchCategory(state);
  const searchTerm = selectSearchTerm(state);
  const books = selectBooks(state);

  if (searchTerm === "" && searchCategory === "") {
    return books;
  }

  return books.filter((item) => {
    let result = true;

    // Check includes name
    if (!item.title.toLowerCase().includes(searchTerm.toLowerCase()))
      return (result = false);

    // Check category
    if (searchCategory !== "" && item.category_name !== searchCategory)
      return (result = false);

    return result;
  });
};

export const { changeSearchCategory, changeSearchTerm } = booksSlice.actions;

export default booksSlice.reducer;

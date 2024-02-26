import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import articleAPI from "../../api/article";

export const fetchTags = createAsyncThunk(
  "articlesSlice/fetchTags",
  async () => {
    try {
      const result = await articleAPI.getTags();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchTypes = createAsyncThunk(
  "articlesSlice/fetchTypes",
  async () => {
    try {
      const result = await articleAPI.getTypes();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchArticles = createAsyncThunk(
  "articlesSlice/fetchArticles",
  async (page) => {
    try {
      const result = await articleAPI.getAll(page);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchArticle = createAsyncThunk(
  "articlesSlice/fetchArticle",
  async (slug) => {
    try {
      const result = await articleAPI.getOne(slug);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchArticlesLatest = createAsyncThunk(
  "articlesSlice/fetchArticlesLatest",
  async (slug) => {
    try {
      const result = await articleAPI.getLastest(slug);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchArticlesByTag = createAsyncThunk(
  "articlesSlice/fetchArticlesByTag",
  async (info) => {
    try {
      const { tag_id, pages } = info;
      const result = await articleAPI.getByTag(tag_id, pages);
      return result.data.data;
    } catch (error) {
      return Promise.reject();
    }
  }
);

export const fetchArticlesByType = createAsyncThunk(
  "articlesSlice/fetchArticlesByType",
  async (info) => {
    try {
      const { type_id, pages } = info;
      const result = await articleAPI.getByType(type_id, pages);
      return result.data.data;
    } catch (error) {
      return Promise.reject();
    }
  }
);

const articlesSlice = createSlice({
  name: "articlesSlice",
  initialState: {
    articles: [],
    articleDetail: {},
    articleLastest: [],
    tags: [],
    types: [],
    count: 0,
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Fetch Tags
    [fetchTags.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchTags.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Types
    [fetchTypes.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchTypes.fulfilled]: (state, action) => {
      state.types = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchTypes.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Articles
    [fetchArticles.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.articles = action.payload.articles;
      state.count = action.payload.count;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchArticles.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Articles by tag
    [fetchArticlesByTag.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchArticlesByTag.fulfilled]: (state, action) => {
      state.articles = action.payload.articles;
      state.count = action.payload.count;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchArticlesByTag.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Articles by type
    [fetchArticlesByType.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchArticlesByType.fulfilled]: (state, action) => {
      state.articles = action.payload.articles;
      state.count = action.payload.count;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchArticlesByType.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Article
    [fetchArticle.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchArticle.fulfilled]: (state, action) => {
      state.articleDetail = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchArticle.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Articles Lastest
    [fetchArticlesLatest.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchArticlesLatest.fulfilled]: (state, action) => {
      state.articleLastest = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchArticlesLatest.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selector

export const selectTags = (state) => state.articles.tags;

export const selectTypes = (state) => state.articles.types;

export const selectArticles = (state) => state.articles.articles;

export const selectArticlesLatest = (state) => state.articles.articleLastest;

export const selectCount = (state) => state.articles.count;

export const selectArticleDetail = (state) => state.articles.articleDetail;

export const selectArticleIsLoading = (state) => state.articles.isLoading;

export default articlesSlice.reducer;

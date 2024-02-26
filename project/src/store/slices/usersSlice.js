import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import userAPI from "../../api/user";

export const signIn = createAsyncThunk(
  "usersSlice/signIn",
  async ({ email, password }) => {
    try {
      const result = await userAPI.signIn(email, password);
      if (!result.data) {
        return Promise.reject(result.response.data.errors[0]);
      }
      const accessToken = result.data.token;
      localStorage.setItem("accessToken", accessToken);

      // Get information of current user after getting token
      const currentUser = await userAPI.getOne(email);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser.data.data)
      );
      return currentUser.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const signUp = createAsyncThunk("usersSlice/signUp", async (patient) => {
  try {
    const result = await userAPI.signUp(patient);
    return result.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const verify = createAsyncThunk("usersSlice/verify", async (code) => {
  try {
    const result = await userAPI.verify(code);
    if (result.data.data.is_verified === 1) {
      const clonecurrentPatient = JSON.parse(
        localStorage.getItem("currentPatient")
      );
      clonecurrentPatient.is_verified = true;
      localStorage.setItem(
        "currentPatient",
        JSON.stringify(clonecurrentPatient)
      );
      return result.data.data.is_verified;
    }
  } catch (error) {
    return Promise.reject(error.message);
  }
});

export const resendCode = createAsyncThunk(
  "usersSlice/resendCode",
  async () => {
    try {
      const result = await userAPI.resendCode();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const updateInformation = createAsyncThunk(
  "usersSlice/updateInformation",
  async (newInformation) => {
    try {
      const result = await userAPI.update(newInformation);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const getIdentity = createAsyncThunk(
  "usersSlice/getIdentity",
  async () => {
    try {
      const result = await userAPI.getOne(
        JSON.parse(localStorage.getItem("currentUser")).email
      );
      return result.data.data;
    } catch (error) {
      return Promise.reject();
    }
  }
);

export const changePassword = createAsyncThunk(
  "usersSlice/changePassword",
  async (password) => {
    try {
      const result = await userAPI.changePassword(password);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "usersSlice",
  initialState: {
    users: [],
    userNeedUpdate: {},
    currentUser: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {
    changeUserNeedUpdateAvatar: (state, action) => {
      state.userNeedUpdate.avatar[0] = action.payload;
    },
    deleteUserNeedUpdateAvatar: (state, action) => {
      state.userNeedUpdate.avatar = [];
    },
  },
  extraReducers: {
    // Sign In
    [signIn.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [signIn.fulfilled]: (state, action) => {
      message.success("Signed In successfully!", 3);
      state.userNeedUpdate = action.payload;
      setTimeout(() => {
        window.location.href = "/";
      }, [1000]);
      state.isLoading = false;
      state.hasError = false;
    },
    [signIn.rejected]: (state, action) => {
      message.error(`${action.error.message}, Please try again!`, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Get identity
    [getIdentity.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [getIdentity.fulfilled]: (state, action) => {
      action.payload.avatar = [{ url: action.payload.avatar }];
      state.userNeedUpdate = action.payload;
      state.currentUser = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [getIdentity.rejected]: (state, action) => {
      message.error(`${action.error.message}, Please try again!`, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Sign Up
    [signUp.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [signUp.fulfilled]: (state, action) => {
      message.success(
        "Signed Up successfully, OTP has been sent. Please login and verify your email!",
        5
      );
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);
      state.isLoading = false;
      state.hasError = false;
    },
    [signUp.rejected]: (state, action) => {
      message.error(`Signed Up failed. Due to ${action.error.message}`, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Verify
    [verify.pending]: (state) => {
      const key = "verify";
      message.loading({
        content: "Action in progress...",
        key,
      });
      state.isLoading = true;
      state.hasError = false;
    },
    [verify.fulfilled]: (state, action) => {
      setTimeout(() => {
        const key = "verify";
        message.success({
          content: "Account has been verified successfully!",
          key,
          duration: 2,
        });
        window.history.back();
        state.isLoading = false;
        state.hasError = false;
      }, 1500);
    },
    [verify.rejected]: (state, action) => {
      message.error(`${action.error.message}`, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Resend Verify Code
    [resendCode.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [resendCode.fulfilled]: (state, action) => {
      message.success(
        "Verified code has been resent. Please check your phone!",
        3
      );
      state.isLoading = false;
      state.hasError = false;
    },
    [resendCode.rejected]: (state, action) => {
      message.error(`${action.error.message}`, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update
    [updateInformation.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateInformation.fulfilled]: (state, action) => {
      message.success("Updated your information successfully!", 3);
      let currentPatient = JSON.parse(localStorage.getItem("currentPatient"));
      currentPatient = action.payload;
      localStorage.setItem("currentPatient", JSON.stringify(currentPatient));
      action.payload.avatar = [{ url: action.payload.avatar }];
      state.userNeedUpdate = action.payload;
      state.currentUser = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [updateInformation.rejected]: (state, action) => {
      message.error(`${action.error.message}`, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Change password
    [changePassword.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [changePassword.fulfilled]: (state, action) => {
      message.success("Changed your password successfully!", 3);
      state.isLoading = false;
      state.hasError = false;
    },
    [changePassword.rejected]: (state, action) => {
      message.error(`${action.error.message}`, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Actions
export const { changeUserNeedUpdateAvatar, deleteUserNeedUpdateAvatar } =
  usersSlice.actions;

// Selectors
export const selectUserIsLoading = (state) => state.users.isLoading;

export const selectCurrentUser = (state) => state.users.currentUser;

export const selectUserNeedUpdate = (state) => state.users.userNeedUpdate;

export default usersSlice.reducer;

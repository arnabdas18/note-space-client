import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  registerUser: {
    isLoading: false,
    userInfo: userInfoFromStorage,
    error: "",
    success: null,
  },
  loginUser: {
    isLoading: false,
    userInfo: userInfoFromStorage,
    error: "",
    success: null,
  },
};

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async ([email, password], thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users/login`,
        { email, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data.result));

      return data.result;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/userRegister",
  async ([name, email, password, pic], thunkAPI) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/users`,
        { name, pic, email, password },
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data.result));

      thunkAPI.dispatch(userLogin([email, password]));

      return data.result;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.registerUser.userInfo = null;
      state.loginUser.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, ({ loginUser }) => {
        loginUser.isLoading = true;
      })
      .addCase(userLogin.fulfilled, ({ loginUser }, { payload }) => {
        loginUser.isLoading = false;
        loginUser.userInfo = payload;
        loginUser.success = true;
      })
      .addCase(userLogin.rejected, ({ loginUser }, { payload }) => {
        loginUser.isLoading = false;
        loginUser.error = payload;
        loginUser.success = false;
      })
      .addCase(userRegister.pending, ({ registerUser }) => {
        registerUser.isLoading = true;
      })
      .addCase(userRegister.fulfilled, ({ registerUser }, { payload }) => {
        registerUser.isLoading = false;
        registerUser.userInfo = payload;
        registerUser.success = true;
      })
      .addCase(userRegister.rejected, ({ registerUser }, { payload }) => {
        registerUser.isLoading = false;
        registerUser.error = payload;
        registerUser.success = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

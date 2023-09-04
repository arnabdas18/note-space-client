import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  userInfo: "",
  error: "",
  success: true,
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

      localStorage.setItem("userInfo", JSON.stringify(data));

      return JSON.stringify(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
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

      localStorage.setItem("userInfo", JSON.stringify(data));

      return JSON.stringify(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = "";
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.success = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      });

    builder
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userInfo = payload;
        state.success = true;
      })
      .addCase(userRegister.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.success = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

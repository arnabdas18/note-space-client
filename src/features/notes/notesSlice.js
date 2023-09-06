import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  noteList: {
    isLoading: false,
    notes: [],
    error: "",
  },
  noteCreate: {
    isLoading: false,
    error: "",
    success: null,
  },
  noteUpdate: {
    isLoading: false,
    error: "",
    success: null,
  },
  noteDelete: {
    isLoading: false,
    message: "",
    error: "",
    success: null,
  },
};

export const getNoteList = createAsyncThunk(
  "notes/getNoteList",
  async (_, thunkAPI) => {
    try {
      const {
        user: {
          loginUser: { userInfo },
        },
      } = thunkAPI.getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/notes`,
        config
      );

      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  async ([title, content, category], thunkAPI) => {
    try {
      const {
        user: {
          loginUser: { userInfo },
        },
      } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/notes/create`,
        { title, content, category },
        config
      );
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ([id, title, content, category], thunkAPI) => {
    try {
      const {
        user: {
          loginUser: { userInfo },
        },
      } = thunkAPI.getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/notes/${id}`,
        { title, content, category },
        config
      );

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

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id, thunkAPI) => {
    try {
      const {
        user: {
          loginUser: { userInfo },
        },
      } = thunkAPI.getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/api/notes/${id}`,
        config
      );

      return data.message;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNoteList.pending, ({ noteList }) => {
        noteList.isLoading = true;
      })
      .addCase(getNoteList.fulfilled, ({ noteList }, { payload }) => {
        noteList.isLoading = false;
        noteList.notes = [...payload];
      })
      .addCase(getNoteList.rejected, ({ noteList }, { payload }) => {
        noteList.isLoading = false;
        noteList.error = payload;
      })
      .addCase(createNote.pending, ({ noteCreate }) => {
        noteCreate.isLoading = true;
      })
      .addCase(createNote.fulfilled, ({ noteCreate }) => {
        noteCreate.isLoading = false;
        noteCreate.success = true;
      })
      .addCase(createNote.rejected, ({ noteCreate }, { payload }) => {
        noteCreate.isLoading = false;
        noteCreate.error = payload;
        noteCreate.success = false;
      })
      .addCase(updateNote.pending, ({ noteUpdate }) => {
        noteUpdate.isLoading = true;
      })
      .addCase(updateNote.fulfilled, ({ noteUpdate }) => {
        noteUpdate.isLoading = false;
        noteUpdate.success = true;
      })
      .addCase(updateNote.rejected, ({ noteUpdate }, { payload }) => {
        noteUpdate.isLoading = false;
        noteUpdate.error = payload;
        noteUpdate.success = false;
      })
      .addCase(deleteNote.pending, ({ noteDelete }) => {
        noteDelete.isLoading = true;
      })
      .addCase(deleteNote.fulfilled, ({ noteDelete }, { payload }) => {
        noteDelete.isLoading = false;
        noteDelete.message = payload;
        noteDelete.success = true;
      })
      .addCase(deleteNote.rejected, ({ noteDelete }, { payload }) => {
        noteDelete.isLoading = false;
        noteDelete.error = payload;
        noteDelete.success = false;
      });
  },
});

export default notesSlice.reducer;

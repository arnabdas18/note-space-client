import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import notesSlice from "./features/notes/notesSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    notes: notesSlice,
  },
});

export default store;

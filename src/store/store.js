import { configureStore } from "@reduxjs/toolkit";
import JournalReducer from "./JournalSlice";

const store = configureStore({
  reducer: {
    auth: JournalReducer,
  },
});

export default store;

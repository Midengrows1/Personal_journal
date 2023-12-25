import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const initialState = {
  userToken: "",
  signState: false,
  deleted: false,
};

const JournalSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authUser(state, action) {
      state.userToken = action.payload;
      state.signState = true;
    },
    signOut(state, action) {
      localStorage.removeItem("userToken");
      state.signState = false;
    },
    reverseDeleted(state, action) {
      state.deleted = !state.deleted;
    },
  },
});
export const { authUser, signOut, reverseDeleted } = JournalSlice.actions;

export default JournalSlice.reducer;

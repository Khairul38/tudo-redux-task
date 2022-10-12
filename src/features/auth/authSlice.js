import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
  slidingWindow: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload;
    },
    userLoggedOut: (state) => {
      state.user = undefined;
      state.slidingWindow = false;
    },
    setSlidingWindow: (state) => {
      state.slidingWindow = !state.slidingWindow;
    },
  },
});

export const { userLoggedIn, userLoggedOut, setSlidingWindow } =
  authSlice.actions;
export default authSlice.reducer;

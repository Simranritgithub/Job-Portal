// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Make sure user is initialized as null or an empty object
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload; // This will set the user data in the Redux store
    },
    updateUserProfile(state, action) {
      // Updates the user profile in the Redux store
      if (state.user) {
        state.user = { ...state.user, ...action.payload }; // Update user with new data
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setUser, updateUserProfile, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;

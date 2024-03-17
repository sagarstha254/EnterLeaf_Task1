import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentProfile: null,
  error: null,
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchProfileStart: (state) => {
      state.loading = true;
    },

    fetchProfileSuccess: (state, action) => {
      state.currentProfile = action.payload;
      state.loading = false;
      state.error = null;
    },

    fetchProfileFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure } =
  profileSlice.actions;

export default profileSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    globalLoading: false,
    toastMessage: null,
  },
  reducers: {
    showLoading: (state) => {
      state.globalLoading = true;
    },
    hideLoading: (state) => {
      state.globalLoading = false;
    },
    showToast: (state, action) => {
      state.toastMessage = action.payload;
    },
    clearToast: (state) => {
      state.toastMessage = null;
    },
  },
});

export const { showLoading, hideLoading, showToast, clearToast } =
  uiSlice.actions;
export default uiSlice.reducer;

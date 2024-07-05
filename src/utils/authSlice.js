import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
  },

  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setToken, setLoading, setSignupData } = authSlice.actions;

export default authSlice.reducer;

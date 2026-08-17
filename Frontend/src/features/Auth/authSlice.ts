import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "@type/auth";

const initialState: {
  isAuth: boolean;
  user?: AuthUser;
} = {
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: AuthUser }>) {
      state.isAuth = true;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isAuth = false;
      state.user = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

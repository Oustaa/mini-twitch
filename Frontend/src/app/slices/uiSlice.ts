import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthMode = "signin" | "login" | undefined;

interface CounterState {
  sidebarOpen: boolean;
  authModal: boolean;
  authMode?: AuthMode;
}

const initialState: CounterState = {
  sidebarOpen: true,
  authModal: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // sidebar
    openSidebar(state) {
      state.sidebarOpen = true;
    },
    closeSidebar(state) {
      state.sidebarOpen = false;
    },
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    // auth modal
    openAuthModal(state, action: PayloadAction<AuthMode>) {
      state.authModal = true;
      state.authMode = action.payload;
    },
    closeAuthModal(state) {
      state.authModal = false;
      state.authMode = undefined;
    },
    toggleAuthModal(state, action: PayloadAction<{ mode?: AuthMode }>) {
      state.authModal = !state.authModal;
      state.authMode = action.payload.mode;
    },
    setAuthMode(state, action: PayloadAction<AuthMode>) {
      state.authMode = action.payload;
    },
  },
});

export const {
  closeSidebar,
  openSidebar,
  toggleSidebar,
  closeAuthModal,
  openAuthModal,
  toggleAuthModal,
  setAuthMode,
} = uiSlice.actions;

export default uiSlice.reducer;

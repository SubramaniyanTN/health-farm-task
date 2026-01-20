import { createSlice } from "@reduxjs/toolkit";

const initialState:ThemeState = {
  theme: 'light',
};
type ThemeState = {
  theme: 'light' | 'dark';
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
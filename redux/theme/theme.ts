import { createSlice } from "@reduxjs/toolkit";

const initialState:ThemeState = {
  theme: 'light',
  language: 'en',
};
type ThemeState = {
  theme: 'light' | 'dark';
  language: 'en' | 'tn';
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setTheme, setLanguage } = themeSlice.actions;
export default themeSlice.reducer;
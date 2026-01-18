import { createSlice } from "@reduxjs/toolkit";
const initialState =  {
    hasSeenWelcome: false,
  };

export const hasSeenWelcome = createSlice({
  name: 'hasSeenWelcome',
  initialState,
  reducers: {
    setHasSeenWelcome: (state, action) => {
      state.hasSeenWelcome = action.payload;
    },
  },
});

export default hasSeenWelcome.reducer;
export const { setHasSeenWelcome } = hasSeenWelcome.actions;
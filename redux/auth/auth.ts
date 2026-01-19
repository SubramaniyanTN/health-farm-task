import { createSlice } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";

type AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

const initialState :AuthState= {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      return {...state,...action.payload}
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      return initialState
    }
  },
});

export default authSlice.reducer;
export const { setAuthData, setUser,logout } = authSlice.actions;
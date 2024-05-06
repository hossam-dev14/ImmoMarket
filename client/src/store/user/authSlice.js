import { createSlice } from "@reduxjs/toolkit";
import { persistState, getStateFromStorage } from '../../utils/localStorage.js';

const initialState = {
  // from mern-typescript-main
  userInfo: getStateFromStorage('userInfo') || null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      if (action.payload.res) {  
        state.userInfo = action.payload.res;
        state.accessToken = state.userInfo.accessToken;
        state.refreshToken =  state.userInfo.refreshToken;
        persistState("userInfo", state.userInfo);
      }
    },

    signOut: (state) => {
      state.userInfo = null;
      state.accessToken = null;
      state.refreshToken = null;
      persistState("userInfo", null);
    },
  },
});

export const { setUserInfo, signOut } = authSlice.actions;
export default authSlice.reducer;

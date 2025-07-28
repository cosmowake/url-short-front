import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthSliceState {
  // user: unknown;
  token: string | null | undefined;
}

const initialState: AuthSliceState = {
  // user: null,
  token: Cookies.get("token"),
};

const authSlice = createSlice({
  reducerPath: "auth",
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      // state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      console.log("logOut", { state });
      // state.user = null;
      state.token = null;
      Cookies.remove("token");
      window.location.href = "/login";
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

// export const getCurrentUser = (state: any) => state.auth.user;
// export const getCurrentToken = (state: any) => state.auth.token;

export default authSlice;

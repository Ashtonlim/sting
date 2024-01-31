import Cookies from "js-cookie";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "/src/api/const.js";

const initialState = {
  user: Cookies.get("jwt") ? true : false,
  status: "idle",
  error: "null",
};

export const login = createAsyncThunk("auth/loginUser", async (payload) => {
  try {
    console.log("createAsyncThunk payload", payload);
    const res = await api.post(`auth/login`, payload);
    return res;
  } catch (err) {
    return err;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove("jwt");
      state.user = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("inside builder add case fulfilled", action.payload);
      // console.log(jwt);
      if (action.payload.status === 200) {
        console.log("redirect");
        state.user = true;
      } else {
        state.user = false;
      }
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

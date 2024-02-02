import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import api from "/src/api/const.js";

const initialState = {
  user: Cookies.get("jwt") ? true : false,
  status: "idle",
  error: "null",
};

export const login = createAsyncThunk("auth/loginUser", async (payload) => {
  try {
    const res = await api.post(`auth/login`, payload);
    console.log("createAsyncThunk res", res);
    if (200 <= res.status && res.status < 300) {
      return res.data;
    }
    return res;
  } catch (err) {
    if (400 <= err.status && err.status < 500) {
      console.log(err);
      throw new Error(err);
    }
  }
});

export const verifyUserGrp = createAsyncThunk(
  "auth/loginUser",
  async (payload) => {
    try {
      const res = await api.post(`auth/login`, payload);
      console.log("createAsyncThunk res", res);
      if (200 <= res.status && res.status < 300) {
        return res.data;
      }
      return res;
    } catch (err) {
      if (400 <= err.status && err.status < 500) {
        console.log(err);
        throw new Error(err);
      }
    }
  }
);

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
      console.log("inside builder add case fulfilled", action);
      const { username } = jwtDecode(Cookies.get("jwt"));
      state.user = username;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "/src/api/const.js";
import axios from "axios";

const jwtToken = Cookies.get("jwt");
const initialState = {
  username: jwtToken ? jwtDecode(jwtToken).username : false,
  status: "idle",
  error: "null",
};

export const login = createAsyncThunk("auth/login", async (payload) => {
  try {
    const res = await axios.post(`auth/login`, payload);
    if (200 <= res.status && res.status < 300) {
      return res.data;
    }
    return res;
  } catch (err) {
    if (400 <= err.status && err.status < 500) {
      throw new Error(err);
    }
  }
});

export const verifyUserGrp = createAsyncThunk(
  "auth/verifyUserGrp",
  async (payload) => {
    try {
      const res = await axios.post(`auth/verifyUserGrp`, payload);
      if (200 <= res.status && res.status < 300) {
        return res.data;
      }
      return res;
    } catch (err) {
      if (400 <= err.status && err.status < 500) {
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
      state.username = false;
      // Review:
      // for some reason, returning true allows it to redirect back to the login page
      // not sure why, could be that state is being updated and it's causing a re-render
      return true;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { username } = jwtDecode(Cookies.get("jwt"));
      state.username = username;
      return "hello";
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

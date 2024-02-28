import axios from "axios";
import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

// const statusStates = ["succeeded", "loading", "failed", "idle"];

const initialState = {
  status: "idle",
  loggedIn: false,
  isAdmin: false,
  secGrp: [],
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      // axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      const { data } = await axios.post(`auth/login`, credentials);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const checkUser = createAsyncThunk("auth/checkUser", async () => {
  try {
    const { status, data } = await axios.post("auth/verifyAccessGrp");
    if (200 <= status && status < 300) {
      return data;
    }
  } catch (err) {
    return err;
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    Cookies.remove("jwt");
    return true;
  } catch (err) {
    return err;
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // logout: (state, action) => { },
  },

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      console.log("login pending", action);
      return { ...state, status: "loading" };
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("login fulfilled", action);
      message.success("Login successful");
      Cookies.set("jwt", action.payload.token, { expires: 60 * 60 });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;

      return {
        ...state,
        ...action.payload,
        loggedIn: true,
        status: "succeeded",
      };
    });
    builder.addCase(login.rejected, (state, action) => {
      message.error(action.payload ? action.payload : "An error occurred");
      return { ...state, loggedIn: false, status: "failed" };
    });
    builder.addCase(checkUser.pending, (state, action) => {
      return { ...state, status: "loading" };
      console.log("checkUser pending", action);
    });
    builder.addCase(checkUser.fulfilled, (state, action) => {
      console.log("checkUser fulfilled", action);
      return { ...state, ...action.payload, status: "succeeded" };
    });
    builder.addCase(checkUser.rejected, (state, action) => {
      console.log("checkUser rejected", action);
      return { ...state, ...action.payload, status: "failed" };
    });
    builder.addCase(logout.pending, (state, action) => {
      console.log("logout pending", action);
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      console.log("logout fulfilled", action);
      return { ...state, loggedIn: false, isAdmin: false, secGrp: [] };
    });
    builder.addCase(logout.rejected, (state, action) => {
      console.log("logout rejected", action);
      return { ...state, loggedIn: false, isAdmin: false, secGrp: [] };
    });
  },
});

// Action creators are generated for each case reducer function
// export const { logout } = authSlice.actions;

export default authSlice.reducer;

import axios from "axios";
import Cookies from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  isAdmin: false,
  secGrp: [],
};

export const login = createAsyncThunk("auth/login", async (credentials) => {
  try {
    // axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    const { status, data } = await axios.post(`auth/login`, credentials);
    if (200 <= status && status < 300) {
      return data;
    }
  } catch (err) {
    return err;
  }
});

export const checkUser = createAsyncThunk("auth/checkUser", async () => {
  try {
    const { status, data } = await axios.post("auth/verifyAccessGrp", {
      groupname: "admin",
    });
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
    // logout: (state, action) => {
    //   state.loggedIn = false;
    //   state.isAdmin = false;
    //   state.secGrp = [];
    //   console.log("logged out", action.payload);
    // },
  },

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      console.log("login pending", action);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("login fulfilled", action);
      return { ...state, ...action.payload, loggedIn: true };
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log("login rejected", action);
    });
    builder.addCase(checkUser.pending, (state, action) => {
      console.log("checkUser pending", action);
    });
    builder.addCase(checkUser.fulfilled, (state, action) => {
      console.log("checkUser fulfilled", action);
      return { ...state, ...action.payload };
    });
    builder.addCase(checkUser.rejected, (state, action) => {
      console.log("checkUser rejected", action);
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
    });
  },
});

// Action creators are generated for each case reducer function
// export const { logout } = authSlice.actions;

export default authSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../pages/Home/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

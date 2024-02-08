import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../pages/Login/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

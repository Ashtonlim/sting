import api from "./const.js";
// import { resHandler } from "./utils.js";
import Cookies from "js-cookie";

export const register = async (credentials) => {
  try {
    const res = await api.post(`auth/register`, credentials);
    if (res.status >= 200 && res.status < 300) {
      return res;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const login = async (credentials) => {
  try {
    const res = await api.post(`auth/login`, credentials);
    if (res.status >= 200 && res.status < 300) {
      return res;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const isLoggedIn = async () => {
  try {
    const jwt = Cookies.get("jwt");
    const res = api.post("verify", { jwt });
    return res;
  } catch (err) {
    throw new Error(err);
  }
};

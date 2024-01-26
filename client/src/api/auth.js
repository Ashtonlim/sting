import api from "./const.js";
import { resHandler } from "./utils.js";

export const register = async (credentials) => {
  try {
    console.log(credentials);
    const res = await api.post(`auth/register`, credentials);
    return await resHandler(res);
  } catch (err) {
    return err;
  }
};

export const login = async (credentials) => {
  try {
    const res = await api.post(`auth/login`, credentials);
    return await resHandler(res);
  } catch (err) {
    return err;
  }
};

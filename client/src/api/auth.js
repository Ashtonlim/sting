import axios from "axios";

const BASE = "http://localhost:3000";

const api = axios.create({
  baseURL: `${BASE}`,
});

export const register = async (credentials) => {
  try {
    console.log(credentials);
    const response = await axios.post(`${BASE}/auth/register`, credentials);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${BASE}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

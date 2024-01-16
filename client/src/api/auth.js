import axios from "axios";

const BASE = "http://localhost:3000";

export const register = async (credentials) => {
  try {
    console.log(credentials);
    const response = await axios.post(
      `${BASE}/api/v1/auth/register`,
      credentials
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post("/api/v1/auth/login", credentials);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

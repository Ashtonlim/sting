import axios from "axios";

const BE_BASE_URL = import.meta.env.VITE_APP_BE_BASE_URL;

const api = axios.create({ baseURL: `${BE_BASE_URL}` });

export default api;

import axios from "axios";

const baseURL = import.meta.env.VITE_APP_BE_BASE_URL;

// if this is set to false, cookies under set-cookie header are not saved
// review: please find out why cookies won't save when false
const withCredentials = true;

// `withCredentials` indicates whether or not cross-site Access-Control requests
// should be made using credentials
const api = axios.create({ baseURL, withCredentials });

export default api;

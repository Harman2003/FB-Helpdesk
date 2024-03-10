import axios from "axios";

const BASE_URL = "https://fb-helpdesk-server-dev-hajj.1.us-1.fl0.io";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

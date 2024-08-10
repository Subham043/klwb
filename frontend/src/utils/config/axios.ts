import axios, { AxiosInstance } from "axios";
import { env } from "./env";

/*
 * Main Axios Instance with base url
 */

const api: AxiosInstance = axios.create({
  baseURL: env.API_ENDPOINT,
  headers: {
    post: {
      Accept: "application/json",
    },
    get: {
      Accept: "application/json",
    },
  },
  withCredentials: true,
  withXSRFToken: true,
});

api.interceptors.request.use(async (config) => {
  if (config.method === "post") {
    await api.get("/sanctum/csrf-cookie");
  }
  return config;
});

export default api;

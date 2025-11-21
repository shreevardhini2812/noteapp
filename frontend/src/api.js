import axios from "axios";

const api = axios.create({
  baseURL: "https://noteapp-h0j3.onrender.com/api",
  withCredentials: true,
});

export default api;

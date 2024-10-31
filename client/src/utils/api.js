import axios from "axios";

// Create an Axios instance with a base URL
const api = axios.create({
  baseURL: "https://immomarket-api.vercel.app/api/",
  // baseURL: "http://localhost:8080/api/",
});

export default api;

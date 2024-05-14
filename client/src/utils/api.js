import axios from "axios";


// Create an Axios instance with a base URL
const api = axios.create({
  // baseURL: 'https://immomarket-api.vercel.app/api',
  baseURL: 'https://immomarket.onrender.com/api/',
});

export default api;
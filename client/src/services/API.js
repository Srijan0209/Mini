import axios from "axios";

// Create an Axios instance with a base URL from environment variables
const API = axios.create({ baseURL: "http://localhost:5000/api/v1" });


// Intercept each request and add the Authorization header if token is available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization =`Bearer ${token}`;
  }
  return req;
});

export default API;
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔐 Attach token to every request
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ⚠️ Handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If token is invalid or expired
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized - logging out");

      localStorage.removeItem("token");

      // Redirect to login page
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default API;
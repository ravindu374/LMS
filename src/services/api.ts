import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  // Render's free tier sleeps after inactivity, so the first request of a
  // session can take 30s+ to wake the instance. Anything past this is a
  // real failure, not a cold start - fail loudly instead of hanging forever.
  timeout: 60_000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // An expired/invalid JWT previously left the app rendering empty lists
    // forever. Clear the dead session and send the user back to login.
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default api;

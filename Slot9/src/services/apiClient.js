import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
  headers: {
    Accept: "application/json"
  }
});

// Response interceptor for global logging & error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[Axios Interceptor OK] ${response.config.method?.toUpperCase()} ${response.config.url} - Status ${response.status}`);
    return response;
  },
  (error) => {
    const status = error.response?.status;
    console.error(`[Axios Interceptor Error] ${error.config?.url} failed with status: ${status ?? error.message}`);
    return Promise.reject(error);
  }
);

import { apiClient } from "./apiClient";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// Fetch implementation with status check & AbortSignal support
export async function getUsersWithFetch(signal, endpointOverride = null) {
  const url = endpointOverride || `${BASE_URL}/users`;
  const response = await fetch(url, {
    signal,
    headers: { Accept: "application/json" }
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText || "Request Failed"}`);
  }

  return await response.json();
}

// Axios implementation with AbortSignal support
export async function getUsersWithAxios(signal, endpointOverride = null) {
  const path = endpointOverride || "/users";
  const response = await apiClient.get(path, { signal });
  return response.data;
}

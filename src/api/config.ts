const configuredAuthUrl = import.meta.env.VITE_AUTH_API_URL;

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL ??
  configuredAuthUrl?.replace(/\/auth\/?$/, "") ??
  "http://localhost:4000/api"
).replace(/\/$/, "");

export const AUTH_API_URL = `${API_BASE_URL}/auth`;

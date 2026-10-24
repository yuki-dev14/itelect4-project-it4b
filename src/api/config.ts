const configuredAuthUrl = import.meta.env.VITE_AUTH_API_URL;
const configuredApiUrl = import.meta.env.VITE_API_URL ??
  configuredAuthUrl?.replace(/\/auth\/?$/, "");
const localApiUrl = "http://localhost:4000/api";
const productionApiUrl = "https://itelect4-backend.vercel.app/api";
const pointsToLocalhost = configuredApiUrl !== undefined &&
  /^https?:\/\/(?:localhost|127(?:\.\d{1,3}){3})(?::\d+)?(?:\/|$)/i.test(configuredApiUrl);
const defaultApiUrl = import.meta.env.PROD ? productionApiUrl : localApiUrl;
const apiUrl = import.meta.env.PROD && pointsToLocalhost
  ? productionApiUrl
  : configuredApiUrl ?? defaultApiUrl;

export const API_BASE_URL = apiUrl.replace(/\/$/, "");

export const AUTH_API_URL = `${API_BASE_URL}/auth`;

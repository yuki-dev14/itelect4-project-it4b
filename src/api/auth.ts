import { AUTH_API_URL } from "./config";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface LoginResponse {
  token: string;
  user: AuthUser;
}

async function request<T>(path: string, body: Record<string, string>): Promise<T> {
  const response = await fetch(`${AUTH_API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = await response.json().catch(() => ({})) as T & { message?: string };

  if (!response.ok) {
    throw new Error(result.message ?? "Unable to connect to the authentication service");
  }

  return result;
}

export function registerAccount(name: string, email: string, password: string): Promise<AuthUser> {
  return request<AuthUser>("/register", { name, email, password });
}

export function loginAccount(email: string, password: string): Promise<LoginResponse> {
  return request<LoginResponse>("/login", { email, password });
}
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "../api/auth";

interface AuthState {
  username: string | null;
  email: string | null;
  token: string | null;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(persist((set) => ({
  username: null,
  email: null,
  token: null,
  login: (user: AuthUser, token: string) => set({ username: user.name, email: user.email, token }),
  logout: () => set({ username: null, email: null, token: null }),
}), {
  name: "itelect-auth",
  partialize: (state) => ({ username: state.username, email: state.email, token: state.token }),
}));

export default useAuthStore;

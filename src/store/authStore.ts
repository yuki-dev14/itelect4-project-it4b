import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(persist((set) => ({
  username: null,
  login: (username: string) => set({ username }),
  logout: () => set({ username: null }),
}), {
  name: "itelect-auth",
  partialize: (state) => ({ username: state.username }),
}));

export default useAuthStore;

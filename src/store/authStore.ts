import create from "zustand";

interface AuthState {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: null,
  login: (token: string) => set({ token }),
  logout: () => set({ token: null }),
}));

export default useAuthStore;

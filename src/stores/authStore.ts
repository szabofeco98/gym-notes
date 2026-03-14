import { Models } from "react-native-appwrite";
import { create } from "zustand";

interface AuthState {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  setUser: (user: Models.User<Models.Preferences> | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));

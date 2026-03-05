import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: (user, token) => set({ user, token }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      // (optional) by default, 'localStorage' is used
    },
  ),
);

export default useAuthStore;

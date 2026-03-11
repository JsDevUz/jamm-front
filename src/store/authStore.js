import { create } from "zustand";
import { API_BASE_URL } from "../config/env";

let bootstrapPromise = null;

const useAuthStore = create((set, get) => ({
  user: null,
  initialized: false,
  loading: false,

  setAuth: (user) =>
    set({
      user,
      initialized: true,
      loading: false,
    }),

  setUser: (user) =>
    set({
      user,
      initialized: true,
      loading: false,
    }),

  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),

  logout: async ({ redirect = true } = {}) => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {}

    set({
      user: null,
      initialized: true,
      loading: false,
    });

    bootstrapPromise = null;

    if (redirect && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  },

  bootstrapAuth: async () => {
    const state = get();
    if (state.initialized) return state.user;
    if (bootstrapPromise) return bootstrapPromise;

    set({ loading: true });

    bootstrapPromise = fetch(`${API_BASE_URL}/auth/me`, {
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          set({
            user: null,
            initialized: true,
            loading: false,
          });
          return null;
        }

        const data = await response.json();
        set({
          user: data,
          initialized: true,
          loading: false,
        });
        return data;
      })
      .catch(() => {
        set({
          user: null,
          initialized: true,
          loading: false,
        });
        return null;
      })
      .finally(() => {
        bootstrapPromise = null;
      });

    return bootstrapPromise;
  },
}));

export default useAuthStore;

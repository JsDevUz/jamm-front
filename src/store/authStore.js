import { create } from "zustand";
import { API_BASE_URL } from "../config/env";

let bootstrapPromise = null;
const APP_LOCK_ARMED_KEY = "jamm-app-lock-armed";
const APP_LOCK_SKIP_ONCE_KEY = "jamm-app-lock-skip-once";
const APP_UNLOCK_TOKEN_KEY = "jamm-app-unlock-token";
const APP_LOCK_CLEARED_EVENT = "jamm-app-lock-cleared";
const APP_LOCK_TOAST_SHOWN_KEY = "jamm-app-lock-toast-shown";

const syncAppLockClientState = (user) => {
  if (typeof window === "undefined") {
    return;
  }

  if (!user?.appLockEnabled) {
    sessionStorage.removeItem(APP_LOCK_ARMED_KEY);
    sessionStorage.removeItem(APP_UNLOCK_TOKEN_KEY);
    sessionStorage.removeItem(APP_LOCK_TOAST_SHOWN_KEY);
    window.dispatchEvent(new CustomEvent(APP_LOCK_CLEARED_EVENT));
    return;
  }

  if (user?.appLockSessionUnlocked === false) {
    sessionStorage.setItem(APP_LOCK_ARMED_KEY, "1");
    sessionStorage.removeItem(APP_UNLOCK_TOKEN_KEY);
    return;
  }

  sessionStorage.removeItem(APP_LOCK_ARMED_KEY);
  sessionStorage.removeItem(APP_LOCK_TOAST_SHOWN_KEY);
};

const useAuthStore = create((set, get) => ({
  user: null,
  initialized: false,
  loading: false,

  setAuth: (user) => {
    syncAppLockClientState(user);
    set({
      user,
      initialized: true,
      loading: false,
    });
  },

  setUser: (user) => {
    syncAppLockClientState(user);
    set({
      user,
      initialized: true,
      loading: false,
    });
  },

  updateUser: (updates) =>
    set((state) => {
      const nextUser = state.user ? { ...state.user, ...updates } : null;
      syncAppLockClientState(nextUser);
      return {
        user: nextUser,
      };
    }),

  logout: async ({ redirect = true } = {}) => {
    try {
      await fetch(`${API_BASE_URL}/users/me/app-lock/logout-clear`, {
        method: "POST",
        credentials: "include",
      });
    } catch {}

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
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(APP_LOCK_ARMED_KEY);
      sessionStorage.setItem(APP_LOCK_SKIP_ONCE_KEY, "1");
      sessionStorage.removeItem(APP_UNLOCK_TOKEN_KEY);
      sessionStorage.removeItem(APP_LOCK_TOAST_SHOWN_KEY);
      window.dispatchEvent(new CustomEvent(APP_LOCK_CLEARED_EVENT));
    }

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
        syncAppLockClientState(data);
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

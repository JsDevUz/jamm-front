import { create } from "zustand";

const STORAGE_KEY = "jamm.server-sidebar.expanded";

const readInitialExpanded = () => {
  if (typeof window === "undefined") {
    return true;
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY);
  if (rawValue === null) {
    return true;
  }

  return rawValue === "true";
};

const useServerSidebarStore = create((set) => ({
  expanded: readInitialExpanded(),
  setExpanded: (value) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, String(Boolean(value)));
    }

    set({
      expanded: Boolean(value),
    });
  },
  toggleExpanded: () =>
    set((state) => {
      const nextValue = !state.expanded;

      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, String(nextValue));
      }

      return {
        expanded: nextValue,
      };
    }),
}));

export default useServerSidebarStore;

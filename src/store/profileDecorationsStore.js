import { create } from "zustand";
import { getProfileDecorations } from "../api/usersApi";

const useProfileDecorationsStore = create((set, get) => ({
  decorations: [],
  loaded: false,
  loading: false,

  fetchDecorations: async (force = false) => {
    const { loaded, loading } = get();
    if (loading || (loaded && !force)) return get().decorations;

    set({ loading: true });

    try {
      const decorations = await getProfileDecorations();
      set({
        decorations,
        loaded: true,
        loading: false,
      });
      return decorations;
    } catch (error) {
      set({
        loading: false,
        loaded: true,
      });
      return [];
    }
  },
}));

export default useProfileDecorationsStore;

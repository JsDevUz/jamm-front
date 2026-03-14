import { create } from "zustand";

const useMeetCallStore = create((set) => ({
  activeCall: null,
  isMinimized: false,

  startCall: (payload) =>
    set({
      activeCall: payload,
      isMinimized: false,
    }),

  minimizeCall: () => set({ isMinimized: true }),
  maximizeCall: () => set({ isMinimized: false }),
  updateActiveCall: (patch) =>
    set((state) => ({
      activeCall: state.activeCall ? { ...state.activeCall, ...patch } : state.activeCall,
    })),
  endCall: () =>
    set({
      activeCall: null,
      isMinimized: false,
    }),
}));

export default useMeetCallStore;

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
  endCall: () =>
    set({
      activeCall: null,
      isMinimized: false,
    }),
}));

export default useMeetCallStore;

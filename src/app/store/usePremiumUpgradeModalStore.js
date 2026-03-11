import { create } from "zustand";

const DEFAULT_MESSAGE = "";

const usePremiumUpgradeModalStore = create((set) => ({
  isOpen: false,
  message: DEFAULT_MESSAGE,
  source: null,
  openPremiumUpgradeModal: ({ message = DEFAULT_MESSAGE, source = null } = {}) =>
    set({
      isOpen: true,
      message,
      source,
    }),
  closePremiumUpgradeModal: () =>
    set({
      isOpen: false,
      message: DEFAULT_MESSAGE,
      source: null,
    }),
}));

export default usePremiumUpgradeModalStore;

import { create } from "zustand";

const initialState = {
  isInfoSidebarOpen: false,
  isEditGroupDialogOpen: false,
  isDescriptionExpanded: false,
  isHeaderMenuOpen: false,
  isDeleteDialogOpen: false,
};

const useChatAreaUiStore = create((set) => ({
  ...initialState,
  toggleInfoSidebar: () =>
    set((state) => ({ isInfoSidebarOpen: !state.isInfoSidebarOpen })),
  openInfoSidebar: () => set({ isInfoSidebarOpen: true }),
  closeInfoSidebar: () => set({ isInfoSidebarOpen: false }),
  openEditGroupDialog: () =>
    set({ isEditGroupDialogOpen: true, isHeaderMenuOpen: false }),
  closeEditGroupDialog: () => set({ isEditGroupDialogOpen: false }),
  toggleDescriptionExpanded: () =>
    set((state) => ({ isDescriptionExpanded: !state.isDescriptionExpanded })),
  collapseDescription: () => set({ isDescriptionExpanded: false }),
  setHeaderMenuOpen: (value) => set({ isHeaderMenuOpen: value }),
  toggleHeaderMenu: () =>
    set((state) => ({ isHeaderMenuOpen: !state.isHeaderMenuOpen })),
  closeHeaderMenu: () => set({ isHeaderMenuOpen: false }),
  openDeleteDialog: () =>
    set({ isDeleteDialogOpen: true, isHeaderMenuOpen: false }),
  closeDeleteDialog: () => set({ isDeleteDialogOpen: false }),
  resetChatAreaUi: () => set(initialState),
}));

export default useChatAreaUiStore;

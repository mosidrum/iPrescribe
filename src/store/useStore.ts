import { create } from 'zustand';

interface UIState {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    sidebarOpen: false, // Mobile initially closed
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    closeSidebar: () => set({ sidebarOpen: false }),
}));

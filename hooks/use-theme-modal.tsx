import { create } from "zustand";

interface ThemeModalState {
    isOpen: boolean;
    open(): void;
    close(): void;
}

export const useThemeModal = create<ThemeModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

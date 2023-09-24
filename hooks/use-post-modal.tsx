import { create } from "zustand";

interface PostModalState {
    isOpen: boolean;
    open(): void;
    close(): void;
}

export const usePostModal = create<PostModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

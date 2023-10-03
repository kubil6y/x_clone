import { create } from "zustand";

interface CommentModalState {
    isOpen: boolean;
    open(): void;
    close(): void;
}

export const useCommentModal = create<CommentModalState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
}));

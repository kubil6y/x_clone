"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCommentModal } from "@/hooks/use-comment-modal";

export const CommentModal = () => {
    const commentModal = useCommentModal();

    function onOpenChange(open: boolean): void {
        if (!open) {
            commentModal.close();
        }
    }
    return (
        <Dialog open={commentModal.isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="">
                <h1>comment modal</h1>
            </DialogContent>
        </Dialog>
    );
};

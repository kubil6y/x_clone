"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { usePostModal } from "@/hooks/use-post-modal";
import { CreatePost } from "../create-post";

export const PostModal = () => {
    const postModal = usePostModal();

    function onOpenChange(open: boolean): void {
        if (!open) {
            postModal.close();
        }
    }
    return (
        <Dialog open={postModal.isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="">
                <CreatePost />
            </DialogContent>
        </Dialog>
    );
};

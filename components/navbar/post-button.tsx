"use client";

import { usePostModal } from "@/hooks/use-post-modal";
import { SendIcon } from "lucide-react";

export const PostButton = () => {
    const postModal = usePostModal();

    return (
        <>
            <button
                className="hidden md:w-[220px] mx-auto md:flex items-center md:px-5 md:py-3 rounded-full bg-rose-500 hover:bg-rose-600 active:bg-rose-700 transition"
                onClick={postModal.open}
            >
                <p className="hidden md:block text-xl text-white w-full text-center font-semibold">
                    Post
                </p>
            </button>

            <button
                className="w-fit flex md:hidden items-center gap-3 p-3 rounded-full bg-rose-500 hover:bg-rose-600 active:bg-rose-700 transition text-white"
                onClick={postModal.open}
            >
                <SendIcon className="w-6 h-6 md:w-8 md:h-8" />
            </button>
        </>
    );
};

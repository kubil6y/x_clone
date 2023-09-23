"use client";

export const PostButton = () => {
    return (
        <button
            className="w-full flex items-center px-5 py-3 rounded-full bg-rose-500 hover:bg-rose-600 active:bg-rose-700 transition"
            onClick={() => { }}
        >
            <p className="hidden md:block text-xl text-white w-full text-center font-semibold">
                Post
            </p>
        </button>
    );
};

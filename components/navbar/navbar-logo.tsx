"use client";

import Link from "next/link";
import { Cat as CatIcon } from "lucide-react";

export const NavbarLogo = () => {
    return (
        <Link
            href="/"
            className="w-fit flex items-center justify-center gap-3 p-3 rounded-full hover:bg-zinc-200 cursor-pointer dark:hover:bg-zinc-700"
        >
            <CatIcon className="w-6 h-6 lg:w-8 lg:h-8" />
        </Link>
    );
};

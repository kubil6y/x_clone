"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface NavbarItemProps {
    icon: LucideIcon;
    text?: string;
    active: boolean;
    onClick: () => void;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({
    text,
    active,
    icon: Icon,
    onClick,
}) => {
    return (
        <button
            className="w-fit flex items-center gap-3 p-3 rounded-full hover:bg-zinc-200 dark:hover:bg-accent"
            onClick={onClick}
        >
            <Icon className="w-6 h-6 md:w-8 md:h-8" />
            <p
                className={cn(
                    "hidden md:block text-xl",
                    active ? "font-semibold" : ""
                )}
            >
                {text}
            </p>
        </button>
    );
};

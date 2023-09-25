"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, MoreHorizontalIcon } from "lucide-react";
import { UserAvatar } from "../user-avatar";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface UserAuthProps {
    user: Session["user"];
}

export const UserNav = ({ user }: UserAuthProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full mt-auto flex items-center hover:bg-zinc-200 dark:hover:bg-accent cursor-pointer md:w-36 lg:w-48 overflow-hidden transition">
                    <UserAvatar user={user} />

                    <div className="hidden md:block text-start text-ellipsis overflow-hidden ml-2 md:text-xs">
                        <p className="text-sm font-semibold truncate">
                            {user.username}
                        </p>
                        <p className="truncate">@{user.username}</p>
                    </div>

                    <div className="hidden md:flex items-center ml-auto">
                        <MoreHorizontalIcon size={16} />
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

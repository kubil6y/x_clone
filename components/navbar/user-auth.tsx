"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    LogOutIcon,
    PaletteIcon,
    SettingsIcon,
} from "lucide-react";
import { MoreHorizontalIcon } from "lucide-react";
import { UserAvatar } from "../user-avatar";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useThemeModal } from "@/hooks/use-theme-modal";

interface UserAuthProps {
    user: Session["user"];
}

// TODO: add dropdown menu onClicks
export const UserAuth = ({ user }: UserAuthProps) => {
    const themeModal = useThemeModal();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full mt-auto flex items-center hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer space-x-2">
                    <UserAvatar user={user} />

                    <div className="flex-1 text-start">
                        <p className="text-sm font-semibold">{user.username}</p>
                        <p className="">@{user.username}</p>
                    </div>

                    <div className="flex items-center">
                        <MoreHorizontalIcon size={16} />
                    </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                        <SettingsIcon className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem onClick={themeModal.open}>
                                <PaletteIcon className="mr-2 h-4 w-4" />
                                <span>Themes</span>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem onClick={() => signOut()}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

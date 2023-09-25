"use client";

import { Session } from "next-auth";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
    user: Pick<Session["user"], "name" | "image" | "username">;
    isClickable?: boolean;
}

export const UserAvatar = ({ user, isClickable = false }: UserAvatarProps) => {
    const router = useRouter();
    const username = useMemo(() => {
        let out: string = "";
        if (user?.name) {
            const parts = user.name.split(" ");
            if (parts.length >= 2) {
                out = parts[0][0] + parts[1][0];
            } else {
                out = user.name[0] + user.name[1];
            }
            return out;
        } else if (user?.username) {
            out = user.username.substring(0, 2);
        } else {
            out = "";
        }
        return out;
    }, [user]);

    return (
        <Avatar
            onClick={() => {
                if (isClickable) {
                    router.push(`${user.username}`);
                }
            }}
            className={cn(isClickable && "cursor-pointer")}
        >
            {user.image ? (
                <div className="relative w-full h-full aspect-square">
                    <Image
                        fill
                        src={user.image}
                        alt="profile picture"
                        referrerPolicy="no-referrer"
                    />
                </div>
            ) : (
                <AvatarFallback className="font-semibold">
                    {username.toUpperCase()}
                </AvatarFallback>
            )}
        </Avatar>
    );
};

"use client";

import { Session } from "next-auth";
import Image from "next/image";
import { Avatar } from "./ui/avatar";
import { useMemo } from "react";

interface UserAvatarProps {
    user: Pick<Session["user"], "name" | "image" | "username">;
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
    const username = useMemo(() => {
        let out: string= "";
        if (user?.name) {
            const parts = user.name.split(" ");
            if (parts.length >= 2) {
                out = parts[0][0] + parts[1][0];
            } else {
                out = user.name[0] + user.name[1];
            }
            return out;
        } else if (user?.username) {
            out = user.username.substring(0, 2).toUpperCase();
        } else {
            out = "";
        }
        return out;
    }, [user]);
    return (
        <Avatar>
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
                <p className="w-full h-full flex items-center justify-center font-semibold text-2xl">
                    {username}
                </p>
            )}
        </Avatar>
    );
};

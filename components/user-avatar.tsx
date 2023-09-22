"use client";

import { User } from "next-auth";
import Image from "next/image";
import { Avatar } from "./ui/avatar";
import { UserIcon } from "lucide-react";

interface UserAvatarProps {
    user: Pick<User, "name" | "image">;
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
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
                    <div className="relative w-full h-full aspect-square">
                        <UserIcon className="w-8 h-8"/>
                    </div>
                )}
        </Avatar>
    );
};


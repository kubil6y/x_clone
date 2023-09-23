"use client";

import {
    HomeIcon,
    LucideIcon,
    UserIcon,
    BellIcon,
    BellDotIcon,
    MoreHorizontalIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { NavbarLogo } from "./navbar-logo";
import { NavbarItem } from "./navbar-item";
import { UserAvatar } from "../user-avatar";

type NavbarItemType = {
    icon: LucideIcon;
    text?: string;
    active: boolean;
    onClick: () => void;
};

export const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session } = useSession();

    const notificationIcon = false ? BellIcon : BellDotIcon;

    const config: NavbarItemType[] = [
        {
            icon: HomeIcon,
            text: "Home",
            active: pathname === "/",
            onClick: () => router.push("/"),
        },
        {
            icon: notificationIcon,
            text: "Notifications",
            active: pathname === "/notifications",
            onClick: () => router.push("/notifications"),
        },
        {
            icon: UserIcon,
            text: "Profile",
            active: pathname === "/profile",
            onClick: () => router.push("/profile"),
        },
    ];

    return (
        <div className="p-4 flex flex-col">
            <div className="w-fit lg:w-[240px] space-y-2">
                <NavbarLogo />

                {config.map((item, idx) => (
                    <NavbarItem
                        key={idx}
                        icon={item.icon}
                        text={item.text}
                        active={item.active}
                        onClick={item.onClick}
                    />
                ))}
            </div>

            {session?.user && (
                <div className="mt-auto flex items-center">
                    <UserAvatar user={session.user} />

                    <div className="flex-1">
                        <p className="text-sm">{session.user.email}</p>
                        <p className="">@{session.user.username}</p>
                    </div>

                    <div className="flex items-center">
                        <MoreHorizontalIcon size={16} />
                    </div>

                </div>
            )}
        </div>
    );
};

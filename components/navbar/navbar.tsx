"use client";

import {
    HomeIcon,
    LucideIcon,
    LogOutIcon,
    UserIcon,
    BellIcon,
    BellDotIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { NavbarLogo } from "./navbar-logo";
import { NavbarItem } from "./navbar-item";

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

    if (session?.user) {
        config.push({
            icon: LogOutIcon,
            text: "Logout",
            active: false,
            onClick: () => signOut(),
        });
    }

    return (
        <div className="p-4">
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
        </div>
    );
};

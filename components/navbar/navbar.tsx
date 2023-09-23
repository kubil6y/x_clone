"use client";

import {
    HomeIcon,
    LucideIcon,
    UserIcon,
    BellIcon,
    BellDotIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { NavbarLogo } from "./navbar-logo";
import { NavbarItem } from "./navbar-item";
import { UserNav } from "./user-nav";
import { MoreNavItem } from "./more-nav-item";
import { PostButton } from "./post-button";

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

    // TODO notificationIcon
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
            <div className="w-fit md:w-[240px] space-y-4">
                <NavbarLogo />

                {session?.user && (
                    <>
                        {config.map((item, idx) => (
                            <NavbarItem
                                key={idx}
                                icon={item.icon}
                                text={item.text}
                                active={item.active}
                                onClick={item.onClick}
                            />
                        ))}
                        <MoreNavItem />
                        <PostButton />
                    </>
                )}
            </div>
            {session?.user && <UserNav user={session.user} />}
        </div>
    );
};

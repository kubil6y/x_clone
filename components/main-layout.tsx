// TODO remove modal shit
"use client";

import { useLoginModal } from "@/hooks/use-login-modal";
import { Navbar } from "./navbar/navbar";
import { RightSection } from "./right-section/right-section";
import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import { signOut } from "next-auth/react";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    const loginModal = useLoginModal();

    return (
        <div className="h-screen container px-0 mx-auto max-w-6xl">
            <div className="flex h-full">
                <Navbar />

                <div className="flex-1">
                    <Button onClick={loginModal.open}>login modal</Button>
                    <Button onClick={() => signOut()}>sign out</Button>
                    <ThemeToggle />

                    {children}
                </div>

                <RightSection />
            </div>
        </div>
    );
};

"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useThemeModal } from "@/hooks/use-theme-modal";
import { AppIcons } from "../app-icons";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { useTheme } from "next-themes";

export const ThemeModal = () => {
    const themeModal = useThemeModal();
    const { setTheme } = useTheme();

    function onOpenChange(open: boolean): void {
        if (!open) {
            themeModal.close();
        }
    }

    return (
        <Dialog open={themeModal.isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <AppIcons.cats className="w-10 h-10 dark:fill-white" />
                        <div className="flex-1 flex flex-col space-y-1">
                            <DialogTitle>Theme Settings</DialogTitle>
                            <DialogDescription>
                                Select your theme
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <div className="flex items-center">
                    <AspectRatio
                        ratio={16 / 9}
                        className="bg-muted"
                        onClick={() => setTheme("dark")}
                    >
                        <Image
                            src="/black-cat.jpg"
                            alt="black cat"
                            fill
                            className="rounded-md rounded-r-none object-cover cursor-pointer"
                        />
                    </AspectRatio>

                    <AspectRatio
                        ratio={16 / 9}
                        className="bg-muted"
                        onClick={() => setTheme("light")}
                    >
                        <Image
                            src="/van-kedisi.jpg"
                            alt="white cat"
                            fill
                            className="rounded-md rounded-l-none object-cover cursor-pointer"
                        />
                    </AspectRatio>
                </div>
            </DialogContent>
        </Dialog>
    );
};

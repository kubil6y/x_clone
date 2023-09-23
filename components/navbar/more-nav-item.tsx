import {
    MoreHorizontalIcon,
    PaletteIcon,
    SettingsIcon,
} from "lucide-react";
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
import { useThemeModal } from "@/hooks/use-theme-modal";

interface MoreNavItemProps { }

export const MoreNavItem = ({ }: MoreNavItemProps) => {
    const themeModal = useThemeModal();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="w-fit flex items-center gap-3 p-3 rounded-full hover:bg-zinc-200 dark:hover:bg-accent">
                        <MoreHorizontalIcon className="w-6 h-6 md:w-8 md:h-8" />
                        <p className="hidden md:block text-xl">More</p>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel className="text-lg font-semibold">
                        @ Connect
                    </DropdownMenuLabel>
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
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

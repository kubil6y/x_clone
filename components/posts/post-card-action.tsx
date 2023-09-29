"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface PostCardActionProps {
    hoverText: string;
    icon: LucideIcon;
    count?: number;
    isActive?: boolean;
    onClick: () => void;
}

export const PostCardAction = ({
    hoverText,
    count,
    isActive,
    icon: Icon,
    onClick,
}: PostCardActionProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div
                        className={cn(
                            "flex items-center justify-center rounded-full w-8 h-8",
                            isActive ? "" : ""
                        )}
                        onClick={onClick}
                    >
                        <Icon className="w-full h-full text-zinc-600 dark:text-zinc-400" />{" "}
                        {count && count}
                    </div>
                </TooltipTrigger>
                <TooltipContent>{hoverText}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

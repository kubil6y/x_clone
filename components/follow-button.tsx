"use client";

import { Button } from "@/components/ui/button";

interface FollowButtonProps {
    userId: string;
}

// TODO left over
export const FollowButton = ({ userId }: FollowButtonProps) => {
    const buttonText = "Follow";
    return <Button onClick={() => console.log(userId)}>{buttonText}</Button>;
};

"use client";

import { useTheme } from "next-themes";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const maxCharacterAmount = 140;

interface CircularProgressProps {
    value: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
    value,
}) => {
    const { theme } = useTheme();
    const getCharCounterPathColor = (input: string): string => {
        if (input.length > maxCharacterAmount) {
            return "#ef4444";
        }
        if (input.length > 120) {
            return "#eab308";
        }
        return "#fda4af";
    };

    return (
        <CircularProgressbar
            maxValue={maxCharacterAmount}
            value={value.length}
            text={(140 - value.length).toString()}
            styles={buildStyles({
                trailColor: theme === "dark" ? "black" : "white",
                pathColor: getCharCounterPathColor(value),
                textSize: 32,
            })}
        />
    );
};

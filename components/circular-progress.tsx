"use client";

import {
    CircularProgressbar,
    buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const maxCharacterAmount = 140;

interface CircularProgressProps {
    value: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
    value,
}) => {
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
                trailColor: "#ffffff",
                pathColor: getCharCounterPathColor(value),
                textSize: 32,
            })}
        />
    );
};

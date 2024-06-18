import {Chip} from "@mui/material";
import React from "react";

interface ReadingLevelIndicatorProps {
    level: string;
}

const ReadingLevelIndicator: React.FC<ReadingLevelIndicatorProps>  = ({level}) => {
    const getLevelColor = () => {
        switch (level) {
            case 'A':
            case 'B':
            case 'C':
                return '#f76434'
            case 'D':
            case 'E':
            case 'F':
            case 'G':
            case 'H':
            case 'I':
                return '#fabd33'
            case 'J':
            case 'K':
            case 'L':
            case 'M':
            case 'N':
            case 'O':
            case 'P':
                return '#cffafa'
            case 'Q':
            case 'R':
            case 'S':
            case 'T':
            case 'U':
            case 'V':
            case 'W':
            case 'X':
            case 'Y':
                return '#4aa088'
        }
    }
    return (
        <Chip label={level} sx={{
            background: getLevelColor(),
        }} />
    )
}

export default ReadingLevelIndicator;
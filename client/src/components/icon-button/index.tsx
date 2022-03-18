import { Tooltip, IconButton as MaterialIconButton } from "@mui/material";
import { PropsWithChildren } from "react";
import { IconButtonColor, IconButtonSize } from "./types";

interface Props {
    title?: string;
    color?: IconButtonColor;
    size?: IconButtonSize;
    className?: string;
    onClick?: () => void;
}

const IconButton = ({
    title = "",
    color,
    size,
    className,
    children,
    onClick
}: PropsWithChildren<Props>) => {
    const handleClick = (event: any) => {
        event.stopPropagation();
        onClick?.();
    }

    return (
        <Tooltip title={title}>
            <MaterialIconButton
                className={className}
                color={color}
                size={size}
                onClick={handleClick}>
                {children}
            </MaterialIconButton>
        </Tooltip>
    );
}

export default IconButton;
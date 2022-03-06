import { Tooltip, IconButton as MaterialIconButton } from "@mui/material";
import { PropsWithChildren } from "react";
import { IconButtonColor, IconButtonSize } from "./types";

interface Props {
    title?: string;
    color?: IconButtonColor;
    size?: IconButtonSize;
    onClick?: () => void;
}

const IconButton = ({ title = "", color, size, children, onClick }: PropsWithChildren<Props>) => (
    <Tooltip title={title}>
        <MaterialIconButton color={color} size={size} onClick={onClick}>
            {children}
        </MaterialIconButton>
    </Tooltip>
);

export default IconButton;
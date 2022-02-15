import { Button, Dialog as MaterialDialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { isString } from "helpers/low-level";
import { PropsWithChildren } from "react";

interface Props {
    isOpen: boolean
    onClose: () => void;
    title?: string;
    primaryButtonLabel?: string;
    secondaryButtonLabel?: string;
    onPrimaryClick?: () => boolean | void;
}

const Dialog = ({
    isOpen,
    onClose,
    title,
    children,
    primaryButtonLabel,
    secondaryButtonLabel = "Cancel",
    onPrimaryClick
}: PropsWithChildren<Props>) => (
    <MaterialDialog open={isOpen} onClose={onClose}>
        {title && (
            <DialogTitle>{title}</DialogTitle>
        )}
        {children && isString(children) ? (
            <DialogContentText>{children}</DialogContentText>
        ) : (
            <DialogContent>{children}</DialogContent>
        )}
        <DialogActions>
            <Button onClick={onClose}>{secondaryButtonLabel}</Button>
            {primaryButtonLabel && (
                <Button onClick={() => onPrimaryClick?.() && onClose()}>
                    {primaryButtonLabel}
                </Button>
            )}
        </DialogActions>
    </MaterialDialog>
);

export default Dialog;
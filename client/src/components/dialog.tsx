import { Button, Dialog as MaterialDialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { isString } from "helpers/low-level";
import { PropsWithChildren } from "react";

interface Props {
    isOpen: boolean
    onClose: () => void;
    title?: string;
    primaryButtonLabel?: string;
    secondaryButtonLabel?: string;
    className?: string;
    contentClassName?: string;
    isPrimaryDisabled?: boolean;
    onPrimaryClick?: () => any;
}

const Dialog = ({
    isOpen,
    onClose,
    title,
    children,
    primaryButtonLabel,
    secondaryButtonLabel = "Cancel",
    className,
    contentClassName,
    isPrimaryDisabled,
    onPrimaryClick
}: PropsWithChildren<Props>) => (
    <MaterialDialog open={isOpen} onClose={onClose} className={className}>
        {title && (
            <DialogTitle>{title}</DialogTitle>
        )}
        {children && isString(children) ? (
            <DialogContentText className={contentClassName}>{children}</DialogContentText>
        ) : (
            <DialogContent className={contentClassName}>{children}</DialogContent>
        )}
        <DialogActions>
            <Button onClick={onClose}>{secondaryButtonLabel}</Button>
            {primaryButtonLabel && (
                <Button disabled={isPrimaryDisabled} onClick={() => onPrimaryClick?.()}>
                    {primaryButtonLabel}
                </Button>
            )}
        </DialogActions>
    </MaterialDialog>
);

export default Dialog;
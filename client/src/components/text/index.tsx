import { Typography } from "@mui/material";
import { Variant as TypographyVariant } from "@mui/material/styles/createTypography";
import classNames from "classnames";
import { PropsWithChildren } from "react";
import styles from "./text.module.scss";

interface Props {
    variant?: TypographyVariant;
    isBold?: boolean;
    className?: string;
}

const Text = ({ variant, isBold, className, children }: PropsWithChildren<Props>) => (
    <Typography
        variant={variant}
        className={classNames(className, {
            [styles.bold]: isBold
        })}>
        {children}
    </Typography>
);

export default Text;
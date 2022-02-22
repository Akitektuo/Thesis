import { Typography } from "@mui/material";
import { Variant as TypographyVariant } from "@mui/material/styles/createTypography";
import classNames from "classnames";
import { CSSProperties, PropsWithChildren } from "react";
import styles from "./text.module.scss";

interface Props {
    variant?: TypographyVariant;
    isBold?: boolean;
    className?: string;
    style?: CSSProperties;
}

const Text = ({ variant, isBold, className, style, children }: PropsWithChildren<Props>) => (
    <Typography
        style={style}
        variant={variant}
        className={classNames(className, {
            [styles.bold]: isBold
        })}>
        {children}
    </Typography>
);

export default Text;
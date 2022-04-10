import { Typography } from "@mui/material";
import { Variant as TypographyVariant } from "@mui/material/styles/createTypography";
import classNames from "classnames";
import { isString } from "helpers/low-level";
import { CSSProperties, PropsWithChildren } from "react";
import styles from "./text.module.scss";

interface Props {
    variant?: TypographyVariant;
    isBold?: boolean;
    className?: string;
    style?: CSSProperties;
    formatAsHtml?: boolean;
}

const Text = ({ variant, isBold, className, style, formatAsHtml, children }: PropsWithChildren<Props>) => {
    const html = isString(children) && formatAsHtml ? {
        __html: children as string
    } : undefined

    return (
        <Typography
            style={style}
            variant={variant}
            className={classNames(className, {
                [styles.bold]: isBold
            })}
            dangerouslySetInnerHTML={html}>
            {html ? undefined : children}
        </Typography>
    );
}

export default Text;
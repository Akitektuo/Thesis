import { Divider } from "@mui/material";
import { IconButton, Text } from "components";
import styles from "./header.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBackSharp";
import { PropsWithChildren } from "react";

interface Props {
    title?: string;
    onClickBack?: () => void;
}

const Header = ({ title, children, onClickBack }: PropsWithChildren<Props>) => (
    <div>
        <div className={styles.headerContent}>
            <IconButton title="Back" color="inherit" onClick={onClickBack}>
                <ArrowBackIcon />
            </IconButton>
            <Text variant="h6">{title}</Text>
            {children}
        </div>
        <Divider />
    </div>
);

export default Header;
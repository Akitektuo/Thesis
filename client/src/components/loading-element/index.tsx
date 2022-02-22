import { CircularProgress } from "@mui/material";
import classNames from "classnames";
import styles from "./loading-element.module.scss";

interface Props {
    show?: boolean;
    className?: string;
}

const LoadingElement = ({ show, className }: Props) => {
    if (!show)
        return null;

    return (
        <div className={classNames(styles.loadingElement, className)}>
            <CircularProgress />
        </div>
    );
}

export default LoadingElement;
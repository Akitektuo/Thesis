import classNames from "classnames";
import { PropsWithChildren } from "react";
import styles from "./center-layout.module.scss";

interface Props {
    className?: string;
}

const CenterLayout = ({ className, children }: PropsWithChildren<Props>) => (
    <div className={classNames(styles.centerLayout, className)}>
        {children}
    </div>
);

export default CenterLayout;
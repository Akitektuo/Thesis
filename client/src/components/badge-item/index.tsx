import { Paper } from "@mui/material";
import classNames from "classnames";
import { Image, Text } from "components";
import { DisplayBadgeType } from "shared/types/badge-types";
import styles from "./badge-item.module.scss";

interface Props extends DisplayBadgeType {
    className?: string;
    onClick?: () => void;
    smaller?: boolean;
}

const BadgeItem = ({ image, name, points, unlocked, className, smaller, onClick }: Props) => {
    return (
        <div className={classNames(styles.badgeContainer, className)} onClick={onClick}>
            <Paper className={styles.imageBackground}>
                <Image
                    src={image}
                    alt={`${name} badge picture`}
                    className={classNames(styles.image, {
                        [styles.smaller]: smaller
                    })} />
            </Paper>
            <Text variant="h6" isBold>{name}</Text>
            {!smaller && (
                <Text><strong>{points}</strong> Points</Text>
            )}
            {!unlocked && (
                <div className={styles.lockedOverlay} />
            )}
        </div>
    );
}

export default BadgeItem;
import { Paper } from "@mui/material";
import classNames from "classnames";
import { Image, Text } from "components";
import { DisplayBadgeType } from "shared/types/badge-types";
import styles from "./badge-item.module.scss";

interface Props extends DisplayBadgeType {
    className?: string;
    onClick?: () => void;
}

const BadgeItem = ({ image, name, points, unlocked, className, onClick }: Props) => {
    return (
        <div className={classNames(styles.badgeContainer, className)} onClick={onClick}>
            <Paper className={styles.imageBackground}>
                <Image className={styles.image} src={image} alt={`${name} badge picture`} />
            </Paper>
            <Text variant="h6" isBold>{name}</Text>
            <Text><strong>{points}</strong> Points</Text>
            {!unlocked && (
                <div className={styles.lockedOverlay} />
            )}
        </div>
    );
}

export default BadgeItem;
import { BadgeItem } from "components";
import { DisplayBadgeType } from "shared/types/badge-types";
import styles from "./badge-grid.module.scss";

interface Props {
    badges: DisplayBadgeType[];
}

const BadgeGrid = ({ badges }: Props) => (
    <div className={styles.gridContainer}>
        {badges.map((badge, index) => (
            <BadgeItem
                className={styles.item}
                key={index}
                {...badge} />
        ))}
    </div>
);

export default BadgeGrid;
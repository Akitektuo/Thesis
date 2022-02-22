import { BadgeItem } from "components";
import { DisplayBadgeType } from "shared/types/badge-types";
import styles from "./badge-list.module.scss";

interface Props {
    badges: DisplayBadgeType[];
}

const BadgeList = ({ badges }: Props) => (
    <div className={styles.listContainer}>
        {badges.map((badge, index) => (
            <BadgeItem key={index} smaller {...badge} />
        ))}
    </div>
);

export default BadgeList;
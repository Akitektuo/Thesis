import { BadgeItem } from "components";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { PlainBadgeType } from "shared/types/badge-types";
import { BadgeGridContext } from "./badge-grid-store";
import styles from "./badge-grid.module.scss";

interface Props {
    unlocked: boolean;
    onClick?: (badge: PlainBadgeType) => void;
}

const BadgeGrid = ({ unlocked, onClick }: Props) => {
    const { badges, fetchBadges } = useContext(BadgeGridContext);

    useEffect(() => {
        fetchBadges();
    }, [fetchBadges]);

    return (
        <div className={styles.gridContainer}>
            {badges.map(badge => (
                <BadgeItem
                    className={styles.item}
                    key={badge.id}
                    unlocked={unlocked}
                    onClick={() => onClick?.(badge)}
                    {...badge} />
            ))}
        </div>
    );
}

export default observer(BadgeGrid);
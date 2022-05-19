import { Paper } from "@mui/material";
import { BadgeItem } from "components";
import { useContext } from "react";
import { AchievementPopupContext } from "./achievement-popup-store";
import styles from "./achievement-popup.module.scss";

const AchievementPopup = () => {
    const { badge } = useContext(AchievementPopupContext);

    if (!badge)
        return null;

    return (
        <Paper className={styles.achievementPopup}>
            <BadgeItem {...badge} />
        </Paper>
    );
}

export default AchievementPopup;
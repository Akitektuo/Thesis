import { Paper } from "@mui/material";
import { BadgeItem } from "components";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { AchievementPopupContext } from "./achievement-popup-store";
import styles from "./achievement-popup.module.scss";

const AchievementPopup = () => {
    const { badge, initialize } = useContext(AchievementPopupContext);

    useEffect(() => initialize(), [initialize]);

    if (!badge)
        return null;

    return (
        <Paper className={styles.achievementPopup} elevation={6}>
            <BadgeItem {...badge} />
        </Paper>
    );
}

export default observer(AchievementPopup);
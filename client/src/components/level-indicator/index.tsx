import { LinearProgress } from "@mui/material";
import { Text } from "components";
import { computeProgress } from "helpers/math";
import { UserDashboardLevelType } from "shared/types/user-types";
import styles from "./level-indicator.module.scss";

const LevelIndicator = ({
    level,
    levelMinimumExperience,
    experience,
    levelMaximumExperience
}: UserDashboardLevelType) => {
    const progressPercent =
        computeProgress(levelMinimumExperience, experience, levelMaximumExperience);
    const currentExperienceLeftStyle = `max(calc(${progressPercent}% - 
        ${experience.toString().length + 1}ch), 1ch)`;

    return (
        <div className={styles.levelIndicator}>
            <Text variant="h6">Level {level}</Text>
            <div className={styles.progressWrapper}>
                <LinearProgress
                    value={progressPercent}
                    className={styles.progress}
                    variant="determinate" />
                <Text
                    variant="caption"
                    className={styles.currentExperience}
                    style={{ left: currentExperienceLeftStyle }}>
                    {experience}
                </Text>
            </div>
            <div className={styles.progressBoundaries}>
                <Text className={styles.experienceLimit} isBold>{levelMinimumExperience}</Text>
                <Text className={styles.experienceLimit} isBold>{levelMaximumExperience}</Text>
            </div>
        </div>
    );
}

export default LevelIndicator;
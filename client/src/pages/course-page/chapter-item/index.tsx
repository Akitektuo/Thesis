import { Text } from "components";
import { ChapterGridItemType } from "shared/types/chapter-types";
import CheckIcon from "@mui/icons-material/CheckSharp";
import styles from "./chapter-item.module.scss";
import { Tooltip } from "@mui/material";
import classNames from "classnames";

interface Props {
    chapter: ChapterGridItemType;
    highlight?: boolean;
    onClick?: (id: string) => void;
    onHighlight?: (id: string) => void;
}

const ChapterItem = ({
    chapter: { id, completed, name, points, unlocked, previousChapterId, previousChapterName },
    highlight,
    onClick,
    onHighlight
}: Props) => {
    const tooltipTitle = unlocked ?
        `Go to chapter` : `Chapter ${previousChapterName} must be completed first`;

    const handleClick = () => {
        if (unlocked)
            onClick?.(id);
        else
            onHighlight?.(previousChapterId ?? "");
    }

    return (
        <Tooltip title={tooltipTitle}>
            <div onClick={handleClick} className={classNames(styles.chapterItemContainer, {
                [styles.highlight]: highlight
            })}>
                {completed ? (
                    <div className={styles.completedIndicator}>
                        <CheckIcon htmlColor="white" />
                    </div>
                ) : (
                    <Text className={styles.pointsIndicator} variant="subtitle2">{points}xp</Text>
                )}
                <Text variant="caption" isBold>{name}</Text>
                <div className={classNames(styles.lockedOverlay, { 
                    [styles.unlocked]: unlocked
                })} />
            </div>
        </Tooltip>
    );
}

export default ChapterItem;
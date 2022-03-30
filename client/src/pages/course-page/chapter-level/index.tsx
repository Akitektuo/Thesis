import { Divider } from "@mui/material";
import classNames from "classnames";
import { Text } from "components";
import { ChapterGridItemType } from "shared/types/chapter-types";
import ChapterItem from "../chapter-item";
import LockIcon from "@mui/icons-material/LockSharp";
import styles from "./chapter-level.module.scss";
import { useUserInformation } from "infrastructure";

interface Props {
    level: number;
    chapters: ChapterGridItemType[];
    showDivider?: boolean;
    highlightChapterId?: string;
    onClick?: (id: string) => void;
    onHighlight?: (id: string) => void;
}

const ChapterLevel = ({
    level,
    chapters,
    showDivider,
    highlightChapterId,
    onClick,
    onHighlight
}: Props) => {
    const userInformation = useUserInformation();

    const unlocked = level <= (userInformation?.level ?? 0);

    return <>
        <div className={styles.levelContainer}>
            <Text className={styles.levelText} variant="h4">Level {level}</Text>
            <div className={styles.chaptersGrid}>
                {chapters.map(chapter => (
                    <ChapterItem
                        key={chapter.id}
                        chapter={chapter}
                        highlight={chapter.id === highlightChapterId}
                        onClick={onClick}
                        onHighlight={onHighlight} />
                ))}
            </div>
            <div className={classNames(styles.lockedOverlay, { 
                [styles.unlocked]: unlocked
            })}>
                <LockIcon className={styles.lockIcon} color="action" />
            </div>
        </div>
        {showDivider && (
            <Divider />
        )}
    </>;
}

export default ChapterLevel;
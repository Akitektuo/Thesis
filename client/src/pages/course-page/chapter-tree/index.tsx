import { Text } from "components";
import { ChapterNodeType } from "shared/types/chapter-types";
import styles from "./chapter-tree.module.scss";

interface Props {
    rootChapter?: ChapterNodeType;
}

const ChapterTree = ({ rootChapter }: Props) => {
    if (!rootChapter)
        return (
            <Text variant="subtitle2" className={styles.noChapterMessage}>
                There are no chapters yet for this course...
            </Text>
        );

    return (
        <Text variant="subtitle2" className={styles.noChapterMessage}>There are no chapters yet for this course...</Text>
    );
}

export default ChapterTree;
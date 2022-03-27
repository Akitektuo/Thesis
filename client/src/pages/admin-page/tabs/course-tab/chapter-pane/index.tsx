import { PlainChapterType } from "shared/types/chapter-types";
import ChapterList from "./chapter-list";
import styles from "./chapter-pane.module.scss";

interface Props {
    courseId?: string;
    highlightChapter?: (chapter: PlainChapterType) => boolean;
    onClickChapter?: (id: string) => void;
    onClickChapterEdit?: (chapter: PlainChapterType) => void;
}

const ChapterPane = ({
    courseId,
    highlightChapter,
    onClickChapter,
    onClickChapterEdit
}: Props) => {
    return <>
        <div className={styles.pane}>
            <ChapterList
                courseId={courseId}
                highlightChapter={highlightChapter}
                onClick={onClickChapter}
                onClickEdit={onClickChapterEdit} />
        </div>
        <div className={styles.pane}></div>
    </>;
}

export default ChapterPane;
import { useContext, useEffect } from "react";
import { PlainChapterType } from "shared/types/chapter-types";
import { ChapterListContext } from "./chapter-list-store";
import sharedStyles from "shared/styles/common.module.scss";
import { List } from "@mui/material";
import ChapterListItem from "../chapter-list-item";
import { observer } from "mobx-react";

interface Props {
    courseId?: string;
    highlightChapter?: (chapter: PlainChapterType) => boolean;
    onClick?: (id: string) => void;
    onClickEdit?: (chapter: PlainChapterType) => void;
}

const ChapterList = ({ courseId = "", highlightChapter, onClick, onClickEdit }: Props) => {
    const { chapters, fetchChapters } = useContext(ChapterListContext);

    useEffect(() => {
        fetchChapters(courseId);
    }, [courseId, fetchChapters]);

    return (
        <List className={sharedStyles.scrollable}>
            {chapters.map((chapter, index) => (
                <ChapterListItem
                    key={chapter.id}
                    showDivider={!!index}
                    highlight={highlightChapter?.(chapter)}
                    onClick={onClick}
                    onClickEdit={() => onClickEdit?.(chapter)}
                    {...chapter} />
            ))}
        </List>
    );
}

export default observer(ChapterList);
import { Text } from "components";
import { useState } from "react";
import { ChapterNodeType, toGridItem } from "shared/types/chapter-types";
import ChapterLevel from "../chapter-level";
import styles from "./chapter-tree.module.scss";

interface Props {
    rootChapter?: ChapterNodeType;
    onClick?: (id: string) => void;
}

const mapChapters = (rootChapter: ChapterNodeType) => {
    const chaptersToProcess = [rootChapter];
    const processedChapters = [toGridItem(rootChapter)];

    while (chaptersToProcess.length) {
        const currentProcess = chaptersToProcess.shift();

        if (!currentProcess?.chapters.length)
            continue;

        chaptersToProcess.push(...currentProcess?.chapters ?? []);

        processedChapters.push(...currentProcess?.chapters.map(chapter =>
            toGridItem(chapter, currentProcess)));
    }

    return processedChapters.sortBy(({ level }) => level)
        .groupBy(({ level }) => level);
}

const ChapterTree = ({ rootChapter, onClick }: Props) => {
    const [highlightChapterId, setHighlightChapterId] = useState("");

    if (!rootChapter)
        return (
            <Text variant="subtitle2" className={styles.noChapterMessage}>
                There are no chapters yet for this course...
            </Text>
        );

    const chapters = mapChapters(rootChapter);
    const lastLevelIndex = chapters.length - 1;

    return <>
        {chapters.map(({ key, elements }, index) => (
            <ChapterLevel
                key={key}
                level={key}
                chapters={elements}
                showDivider={index !== lastLevelIndex}
                highlightChapterId={highlightChapterId}
                onHighlight={setHighlightChapterId}
                onClick={onClick} />
        ))}
    </>;
}

export default ChapterTree;
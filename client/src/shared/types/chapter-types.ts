import { InputNumber } from ".";

export interface PlainChapterType {
    id?: string;
    name: string;
    points: number;
    level: number;
    parentChapterId?: string;
    filesPath: string;
    courseId: string;
}

export interface InputPlainChapterType {
    id?: string;
    name: string;
    points: InputNumber;
    level: InputNumber;
    parentChapterId?: string;
    courseId: string;
    filesPath: string;
}

export const EMPTY_INPUT_PLAIN_CHAPTER: InputPlainChapterType = {
    name: "",
    points: null,
    level: null,
    courseId: "",
    filesPath: ""
}

export const toPlainChapter = (from: InputPlainChapterType): PlainChapterType => ({
    ...from,
    points: from.points ?? 0,
    level: from.level ?? 0
});

export interface ChapterNodeType {
    id: string;
    name: string;
    unlocked: boolean;
    completed: boolean;
    points: number;
    level: number;
    chapters: ChapterNodeType[];
}

export interface ChapterGridItemType {
    id: string;
    name: string;
    unlocked: boolean;
    completed: boolean;
    points: number;
    level: number;
    previousChapterId?: string;
    previousChapterName?: string;
}

export const toGridItem = (
    from: ChapterNodeType,
    parent?: ChapterNodeType
): ChapterGridItemType => ({
    id: from.id,
    name: from.name,
    unlocked: from.unlocked,
    completed: from.completed,
    points: from.points,
    level: from.level,
    previousChapterId: parent?.id,
    previousChapterName: parent?.name
});
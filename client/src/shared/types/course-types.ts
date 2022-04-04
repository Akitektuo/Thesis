import { ChapterNodeType } from "./chapter-types";

export interface PlainCourseType {
    id?: string;
    name: string;
    image: string;
}

export const EMPTY_PLAIN_COURSE: PlainCourseType = {
    name: "",
    image: ""
}

export interface DisplayCourseType {
    id: string;
    name: string;
    image: string;
    availablePoints: number;
    totalChapters: number;
    completedChapters: number;
}

export interface CourseDetailsType {
    id: string;
    name: string;
    totalChapters: number;
    completedChapters: number;
    rootChapter?: ChapterNodeType;
}
export interface PlainCourseType {
    id?: string;
    name: string;
    image: string;
}

export const EMPTY_PLAIN_COURSE_TYPE: PlainCourseType = {
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
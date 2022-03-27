import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { PlainChapterType } from "shared/types/chapter-types";
import { PlainCourseType } from "shared/types/course-types";
import { chapterListStore } from "./chapter-pane/chapter-list/course-list-store";
import { courseListStore } from "./course-list/course-list-store";

export class CourseTabStore {
    public selectedCourse: string = "";
    public selectedChapter: string = "";
    public courseEdit: PlainCourseType | null | undefined = undefined;
    public chapterEdit: PlainChapterType | null | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    public selectCourse = (id: string) => {
        if (this.selectedCourse === id)
            return;

        this.selectedCourse = id;
        this.selectedChapter = "";
    }

    public selectChapter = (id: string) => {
        if (this.selectedChapter === id)
            return;

        this.selectedChapter = id;
    }

    public closeCourseDialog = () => this.courseEdit = undefined;

    public openAddCourseDialog = () => this.courseEdit = null;

    public openEditCourseDialog = (course: PlainCourseType) => this.courseEdit = course;

    public onSaveCourse = (course: PlainCourseType, isAdd: boolean) => {
        const action = isAdd ? courseListStore.addCourse : courseListStore.updateCourse;

        action(course);
    }

    public closeChapterDialog = () => this.chapterEdit = undefined;

    public openAddChapterDialog = () => this.chapterEdit = null;

    public openEditChapterDialog = (chapter: PlainChapterType) => this.chapterEdit = chapter;

    public onSaveChapter = (chapter: PlainChapterType, isAdd: boolean) => {
        const action = isAdd ? chapterListStore.addChapter : chapterListStore.updateChapter;

        action(chapter);
    }

    public reset = () => {
        this.closeCourseDialog();
        this.closeChapterDialog();
    }
}

export const courseTabStore = new CourseTabStore();
export const CourseTabContext = createContext(courseTabStore);
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { PlainCourseType } from "shared/types/course-types";
import { courseListStore } from "./course-list/course-list-store";

export class CourseTabStore {
    public selectedCourse: string = "";
    public courseEdit: PlainCourseType | null | undefined = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    public selectCourse = (id: string) => {
        if (this.selectedCourse === id)
            return;

        this.selectedCourse = id;
    }

    public closeDialog = () => this.courseEdit = undefined;

    public openAddDialog = () => this.courseEdit = null;

    public openEditDialog = (course: PlainCourseType) => this.courseEdit = course;

    public onSave = (course: PlainCourseType, isAdd: boolean) => {
        const action = isAdd ? courseListStore.addCourse : courseListStore.updateCourse;

        action(course);
    }

    public reset = () => {
        this.closeDialog();
    }
}

export const courseTabStore = new CourseTabStore();
export const CourseTabContext = createContext(courseTabStore);
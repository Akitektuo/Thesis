import { makeAutoObservable } from "mobx";
import { createContext } from "react";

export class CourseTabStore {
    public selectedCourse: string = ""; 

    constructor() {
        makeAutoObservable(this);
    }

    public selectCourse = (id: string) => {
        if (this.selectedCourse === id)
            return;

        this.selectedCourse = id;
    }
}

export const courseTabStore = new CourseTabStore();
export const CourseTabContext = createContext(courseTabStore);
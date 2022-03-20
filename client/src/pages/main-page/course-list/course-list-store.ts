import { getAllCoursesForUser } from "accessor/course-accessor";
import { loadingService } from "infrastructure";
import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import { DisplayCourseType } from "shared/types/course-types";

export class CourseListStore {
    public courses: DisplayCourseType[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public fetchCourses = async () => {
        loadingService.setLoading(true);
        const courses = await getAllCoursesForUser();

        runInAction(() => this.courses = courses);
        loadingService.setLoading(false);
    }
}

export const courseListStore = new CourseListStore();
export const CourseListContext = createContext(courseListStore);
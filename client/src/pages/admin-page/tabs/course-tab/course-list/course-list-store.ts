import { getAllCourses } from "accessor/course-accessor";
import { loadingService } from "infrastructure";
import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import { PlainCourseType } from "shared/types/course-types";

export class CourseListStore {
    public courses: PlainCourseType[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public fetchCourses = async () => {
        loadingService.setLoading(true);

        const courses = await getAllCourses();
        runInAction(() => this.courses = courses);
        
        loadingService.setLoading(false);
    }

    public addCourse = (course: PlainCourseType) => this.courses.push(course);

    public updateCourse = (course: PlainCourseType) =>
        this.courses.update(course, ({ id }) => id === course.id);
}

export const courseListStore = new CourseListStore();
export const CourseListContext = createContext(courseListStore);
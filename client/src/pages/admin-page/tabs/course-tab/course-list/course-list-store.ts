import { getAllCourses } from "accessor/course-accessor";
import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import { PlainCourseType } from "shared/types/course-types";

const courseExample = [{
    id: "0",
    name: "Test",
    image: "https://www.testim.io/wp-content/uploads/2019/11/Testim-What-is-a-Test-Environment_-A-Guide-to-Managing-Your-Testing-A.png"
}, {
    id: "1",
    name: "Other Test",
    image: "https://i0.wp.com/unibuc.ro/wp-content/uploads/2020/01/cazare.jpg?resize=700%2C480&ssl=1"
}]

export class CourseListStore {
    public courses: PlainCourseType[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public fetchCourses = async () => {
        const courses = await getAllCourses();
        runInAction(() => this.courses = courseExample);
    }
}

export const courseListStore = new CourseListStore();
export const CourseListContext = createContext(courseListStore);
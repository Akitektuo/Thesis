import { getCourse } from "accessor/course-accessor";
import { loadingService, navigationService, toastService } from "infrastructure";
import { makeAutoObservable, runInAction } from "mobx";
import { ROUTE_INDEX } from "pages/routes/constants";
import { createContext } from "react";
import { CourseDetailsType } from "shared/types/course-types";

export class CoursePageStore {
    public courseDetails: CourseDetailsType | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    public fetchCourseDetails = async (courseId: string | undefined) => {
        if (!courseId)
            return this.showErrorAndRedirect("Error: Invalid course ID!");

        loadingService.setLoading(true);
        
        try {
            const courseDetails = await getCourse(courseId);
            runInAction(() => this.courseDetails = courseDetails);
        } catch (error: any) {
            this.showErrorAndRedirect(error);
        }

        loadingService.setLoading(false);
    }

    private showErrorAndRedirect = (error: string) => {
        toastService.showError(error);
        navigationService.to(ROUTE_INDEX);
    }
}

export const coursePageStore = new CoursePageStore();
export const CoursePageContext = createContext(coursePageStore);
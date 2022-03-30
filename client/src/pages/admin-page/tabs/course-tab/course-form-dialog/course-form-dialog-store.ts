import { createCourse, updateCourse } from "accessor/course-accessor";
import { loadingService, toastService } from "infrastructure";
import { makeAutoObservable, toJS } from "mobx";
import { createContext } from "react";
import { EMPTY_PLAIN_COURSE_TYPE, PlainCourseType } from "shared/types/course-types";
import { makeValidator, Validator } from "validation";
import CourseFormDialogRules from "./course-form-dialog-rules";

export class CourseFormDialogStore {
    public courseEdit: PlainCourseType = EMPTY_PLAIN_COURSE_TYPE;
    public shouldShow: boolean = false;
    public isAdd: boolean = true;

    public validator: Validator<PlainCourseType>;

    constructor() {
        makeAutoObservable(this);
        this.validator = makeValidator(this.courseEdit, CourseFormDialogRules);
    }

    public setCourse = (course: PlainCourseType | null | undefined) => {
        if (course === undefined)
            return this.shouldShow = false;

        this.setCourseEdit(course ?? EMPTY_PLAIN_COURSE_TYPE);
        this.isAdd = course === null;
        this.shouldShow = true;
    }

    private setCourseEdit = (fromCourse: PlainCourseType) => {
        this.courseEdit = toJS(fromCourse);
        this.validator = makeValidator(this.courseEdit, CourseFormDialogRules);
    }

    public setName = (name: string) => this.courseEdit.name = name;

    public setImage = (image: string) => this.courseEdit.image = image;

    public handleSave = async () => {
        this.validator.validate();
        if (!this.validator.isValid())
            return;

        loadingService.setLoading(true);
        const apiCall = this.isAdd ? createCourse : updateCourse;

        try {
            const result = await apiCall(this.courseEdit);

            const actionName = this.isAdd ? "created" : "updated";
            toastService.showSuccess(`Course '${this.courseEdit.name}' ${actionName} successfully!`);
            loadingService.setLoading(false);
            
            return result;
        } catch (error: any) {
            toastService.showError(error);
            loadingService.setLoading(false);
        }
    }
}

export const courseFormDialogStore = new CourseFormDialogStore();
export const CourseFormDialogContext = createContext(courseFormDialogStore);
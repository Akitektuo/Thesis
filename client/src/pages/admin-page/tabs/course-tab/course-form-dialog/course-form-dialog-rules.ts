import { PlainCourseType } from "shared/types/course-types";
import { RulesType } from "validation";

const CourseFormDialogRules: RulesType<PlainCourseType> = {
    name: {
        required: "The name is required!"
    },
    image: {
        required: "The image is required!"
    }
}

export default CourseFormDialogRules;
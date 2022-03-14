import { List } from "@mui/material";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import CourseListItem from "../course-list-item";
import { CourseListContext } from "./course-list-store";
import sharedStyles from "shared/styles/common.module.scss";
import { PlainCourseType } from "shared/types/course-types";

interface Props {
    highlightCourses?: (course: PlainCourseType) => boolean;
    onClick?: (id: string) => void;
}

const CourseList = ({ highlightCourses, onClick }: Props) => {
    const { courses, fetchCourses } = useContext(CourseListContext);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    return (
        <List className={sharedStyles.scrollable}>
            {courses.map((course, index) => (
                <CourseListItem
                    key={course.id}
                    showDivider={!!index}
                    highlight={highlightCourses?.(course)}
                    onClick={onClick}
                    {...course} />
            ))}
        </List>
    );
}

export default observer(CourseList);
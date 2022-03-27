import { observer } from "mobx-react";
import { ROUTE_COURSE } from "pages/routes/constants";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseListItem from "../course-list-item";
import { CourseListContext } from "./course-list-store";

const CourseList = () => {
    const navigate = useNavigate();
    const { courses, fetchCourses } = useContext(CourseListContext);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    return <>
        {courses.map(course => (
            <CourseListItem
                key={course.id}
                course={course}
                onClick={id => navigate(`${ROUTE_COURSE}/${id}`)} />
        ))}
    </>;
}

export default observer(CourseList);
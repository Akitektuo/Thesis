import { getCourse } from "accessor/course-accessor";
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

    const t = async (id: string) => {
        const r = await getCourse(id);
        console.log(r);
    }

    return <>
        {courses.map(course => (
            <CourseListItem
                key={course.id}
                course={course}
                onClick={id => {
                    navigate(`${ROUTE_COURSE}/${id}`);
                    t(id);    
                }} />
        ))}
    </>;
}

export default observer(CourseList);
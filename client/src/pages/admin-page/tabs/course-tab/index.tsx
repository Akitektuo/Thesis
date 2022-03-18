import { Fab, Tooltip } from "@mui/material";
import { AddButton } from "components";
import { observer } from "mobx-react";
import { useContext } from "react";
import CourseList from "./course-list";
import { CourseTabContext } from "./course-tab-store";
import CourseIcon from '@mui/icons-material/SchoolSharp';
import styles from "./course-tab.module.scss";

const CourseTab = () => {
    const { selectedCourse, selectCourse } = useContext(CourseTabContext);

    return <>
        <div className={styles.container}>
            <div className={styles.coursePane}>
                <CourseList
                    onClick={selectCourse}
                    highlightCourses={({ id }) => id === selectedCourse} />
            </div>
        </div>
        <AddButton>
            <Tooltip title="Add course">
                <Fab className={styles.addButton} size="small" onClick={() => console.log("add course")}>
                    <CourseIcon />
                </Fab>
            </Tooltip>
        </AddButton>
    </>;
}

export default observer(CourseTab);
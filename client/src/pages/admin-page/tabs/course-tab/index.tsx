import { Fab, Tooltip } from "@mui/material";
import { AddButton } from "components";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import CourseList from "./course-list";
import { CourseTabContext } from "./course-tab-store";
import CourseIcon from '@mui/icons-material/SchoolSharp';
import styles from "./course-tab.module.scss";
import CourseFormDialog from "./course-form-dialog";

const CourseTab = () => {
    const {
        selectedCourse,
        courseEdit,
        selectCourse,
        closeDialog,
        openAddDialog,
        openEditDialog,
        onSave,
        reset
    } = useContext(CourseTabContext);

    useEffect(() => reset, [reset]);

    return <>
        <div className={styles.container}>
            <div className={styles.coursePane}>
                <CourseList
                    onClick={selectCourse}
                    onClickEdit={openEditDialog}
                    highlightCourses={({ id }) => id === selectedCourse} />
            </div>
        </div>
        <AddButton>
            <Tooltip title="Add course">
                <Fab className={styles.addButton} size="small" onClick={openAddDialog}>
                    <CourseIcon />
                </Fab>
            </Tooltip>
        </AddButton>
        <CourseFormDialog course={courseEdit} onClose={closeDialog} onSave={onSave} />
    </>;
}

export default observer(CourseTab);
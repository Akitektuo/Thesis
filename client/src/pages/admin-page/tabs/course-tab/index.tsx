import { Fab, Tooltip } from "@mui/material";
import { AddButton } from "components";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import CourseList from "./course-list";
import { CourseTabContext } from "./course-tab-store";
import CourseIcon from "@mui/icons-material/SchoolSharp";
import ChapterIcon from "@mui/icons-material/BookmarkSharp";
import ContentIcon from "@mui/icons-material/TextSnippetSharp";
import styles from "./course-tab.module.scss";
import CourseFormDialog from "./course-form-dialog";
import ChapterPane from "./chapter-pane";
import ChapterFormDialog from "./chapter-pane/chapter-form-dialog";
import ContentFormDialog from "./chapter-pane/content-form-dialog";

const CourseTab = () => {
    const {
        selectedCourse,
        selectedChapter,
        courseEdit,
        chapterEdit,
        contentEdit,
        selectCourse,
        closeCourseDialog,
        openAddCourseDialog,
        openEditCourseDialog,
        onSaveCourse,
        selectChapter,
        closeChapterDialog,
        openAddChapterDialog,
        openEditChapterDialog,
        onSaveChapter,
        closeContentDialog,
        openAddContentDialog,
        openEditContentDialog,
        onSaveContent,
        reset
    } = useContext(CourseTabContext);

    useEffect(() => reset, [reset]);

    return <>
        <div className={styles.container}>
            <div className={styles.coursePane}>
                <CourseList
                    onClick={selectCourse}
                    onClickEdit={openEditCourseDialog}
                    highlightCourses={({ id }) => id === selectedCourse} />
            </div>
            <ChapterPane
                courseId={selectedCourse}
                chapterId={selectedChapter}
                highlightChapter={({ id }) => id === selectedChapter}
                onClickChapter={selectChapter}
                onClickChapterEdit={openEditChapterDialog}
                onClickContentEdit={openEditContentDialog} />
        </div>
        <AddButton>
            {!!selectedChapter && (
                <Tooltip title="Add content">
                    <Fab className={styles.addButton} size="small" onClick={openAddContentDialog}>
                        <ContentIcon />
                    </Fab>
                </Tooltip>
            )}
            {!!selectedCourse && (
                <Tooltip title="Add chapter">
                    <Fab className={styles.addButton} size="small" onClick={openAddChapterDialog}>
                        <ChapterIcon />
                    </Fab>
                </Tooltip>
            )}
            <Tooltip title="Add course">
                <Fab className={styles.addButton} size="small" onClick={openAddCourseDialog}>
                    <CourseIcon />
                </Fab>
            </Tooltip>
        </AddButton>
        <CourseFormDialog course={courseEdit} onClose={closeCourseDialog} onSave={onSaveCourse} />
        <ChapterFormDialog
            chapter={chapterEdit}
            onClose={closeChapterDialog}
            onSave={onSaveChapter} />
        <ContentFormDialog
            content={contentEdit}
            onClose={closeContentDialog}
            onSave={onSaveContent} />
    </>;
}

export default observer(CourseTab);
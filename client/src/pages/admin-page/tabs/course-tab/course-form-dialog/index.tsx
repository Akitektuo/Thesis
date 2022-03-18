import { Dialog, TextInput } from "components";
import { useForceUpdate } from "infrastructure";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { PlainCourseType } from "shared/types/course-types";
import { CourseFormDialogContext } from "./course-form-dialog-store";
import styles from "./course-form-dialog.module.scss";

interface Props {
    course: PlainCourseType | null | undefined;
    onSave: (course: PlainCourseType, isAdd: boolean) => void;
    onClose: () => void;
}

const CourseFormDialog = ({ course, onSave, onClose }: Props) => {
    useForceUpdate();
   
    const {
        courseEdit,
        isAdd,
        shouldShow,
        validator,
        setCourse,
        setName,
        setImage,
        handleSave
    } = useContext(CourseFormDialogContext);

    useEffect(() => {
        setCourse(course);
    }, [course, setCourse]);

    const emitSave = async () => {
        const result = await handleSave();

        if (!result)
            return;
        
        onSave(result, isAdd);
        onClose();
    }

    return (
        <Dialog
            isOpen={shouldShow}
            onClose={onClose}
            title={isAdd ? "Create a new course" : `Update course ${course?.name}`}
            primaryButtonLabel={isAdd ? "Create" : "Update"}
            onPrimaryClick={emitSave}
            className={styles.dialog}
            contentClassName={styles.container}
            isPrimaryDisabled={validator.isSubmitDisabled()}>
            <TextInput
                validator={validator}
                fieldName="name"
                className={styles.input}
                label="Name"
                value={courseEdit.name}
                onChange={setName} />
            <TextInput
                validator={validator}
                fieldName="image"
                className={styles.input}
                label="Image"
                value={courseEdit.image}
                onChange={setImage} />
        </Dialog>
    )
}

export default observer(CourseFormDialog);
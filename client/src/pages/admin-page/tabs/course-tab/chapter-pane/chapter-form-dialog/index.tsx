import { Dialog, NumberInput, TextInput } from "components";
import { useForceUpdate } from "infrastructure";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { PlainChapterType } from "shared/types/chapter-types";
import { ChapterFormDialogContext } from "./chapter-form-dialog-store";
import styles from "./chapter-form-dialog.module.scss";

interface Props {
    chapter: PlainChapterType | null | undefined;
    onSave: (chapter: PlainChapterType, isAdd: boolean) => void;
    onClose: () => void;
}

const ChapterFormDialog = ({ chapter, onSave, onClose }: Props) => {
    useForceUpdate();

    const {
        chapterEdit,
        isAdd,
        shouldShow,
        validator,
        setChapter,
        setName,
        setPoints,
        setLevel,
        handleSave
    } = useContext(ChapterFormDialogContext);

    useEffect(() => {
        setChapter(chapter);
    }, [chapter, setChapter]);

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
            title={isAdd ? "Create a new chapter" : `Update chapter ${chapter?.name}`}
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
                value={chapterEdit.name}
                onChange={setName} />
            <NumberInput
                validator={validator}
                fieldName="points"
                className={styles.input}
                label="Points"
                value={chapterEdit.points}
                onChange={setPoints} />
            <NumberInput
                validator={validator}
                fieldName="level"
                className={styles.input}
                label="Level"
                value={chapterEdit.level}
                onChange={setLevel} />
        </Dialog>
    );
}

export default observer(ChapterFormDialog);
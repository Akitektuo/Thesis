import { Dialog, Dropdown, NumberInput, TextInput, Text, UploadInput } from "components";
import { useForceUpdate } from "infrastructure";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { PlainChapterType } from "shared/types/chapter-types";
import { ChapterListContext } from "../chapter-list/chapter-list-store";
import { ChapterFormDialogContext } from "./chapter-form-dialog-store";
import styles from "./chapter-form-dialog.module.scss";

interface Props {
    chapter: PlainChapterType | null | undefined;
    onSave: (chapter: PlainChapterType, isAdd: boolean) => void;
    onClose: () => void;
}

const DEFAULT_PARENT_CHAPTER = {
    value: null,
    display: <Text variant="subtitle2">No parent</Text>,
    default: true
};

const ChapterFormDialog = ({ chapter, onSave, onClose }: Props) => {
    useForceUpdate();

    const {
        chapterEdit,
        file,
        isAdd,
        shouldShow,
        validator,
        setChapter,
        setName,
        setPoints,
        setLevel,
        setParentChapter,
        setFile,
        handleSave
    } = useContext(ChapterFormDialogContext);

    const { chapters } = useContext(ChapterListContext);

    useEffect(() => {
        setChapter(chapter);
    }, [chapter, setChapter]);

    const availableParentChapters = [
        DEFAULT_PARENT_CHAPTER,
        ...chapters.filter(({ id }) => id !== chapter?.id)
            .map(({ id, name }) => ({
                value: id ?? "",
                display: name
            }))
    ];

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
            <Dropdown
                className={styles.input}
                label="Parent Chapter"
                value={chapterEdit.parentChapterId ?? ""}
                options={availableParentChapters}
                onChange={setParentChapter} />
            <UploadInput
                className={styles.input}
                label="Sample project"
                acceptWildcard=".zip"
                defaultValue={chapterEdit.filesPath}
                value={file ? [file] : []}
                onChange={files => setFile(files[0])}  />
        </Dialog>
    );
}

export default observer(ChapterFormDialog);
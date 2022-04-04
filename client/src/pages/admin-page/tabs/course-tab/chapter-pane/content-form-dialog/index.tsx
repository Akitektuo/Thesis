import { Dialog, Dropdown, TextInput } from "components";
import { useForceUpdate } from "infrastructure";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { ContentTypeEnum, PlainContentType } from "shared/types/content-types";
import { ContentFormDialogContext } from "./content-form-dialog-store";
import styles from "./content-form-dialog.module.scss";

interface Props {
    content: PlainContentType | null | undefined;
    onSave: (content: PlainContentType, isAdd: boolean) => void;
    onClose: () => void;
}

const ContentFormDialog = ({ content, onSave, onClose }: Props) => {
    useForceUpdate();

    const {
        contentEdit,
        isAdd,
        shouldShow,
        validator,
        setContent,
        setType,
        setText,
        handleSave
    } = useContext(ContentFormDialogContext);

    useEffect(() => {
        setContent(content);
    }, [content, setContent]);

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
            title={isAdd ? "Create new content" : `Update content`}
            primaryButtonLabel={isAdd ? "Create" : "Update"}
            onPrimaryClick={emitSave}
            className={styles.dialog}
            contentClassName={styles.container}
            isPrimaryDisabled={validator.isSubmitDisabled()}>
            <Dropdown
                className={styles.input}
                label="Content type"
                value={contentEdit.type}
                onChange={setType}
                options={[{
                    value: ContentTypeEnum.TEXT,
                    display: "Text"
                }, {
                    value: ContentTypeEnum.CODE,
                    display: "Code"
                }]} />
            <TextInput
                validator={validator}
                fieldName="text"
                className={styles.input}
                label="Text"
                value={contentEdit.text}
                onChange={setText}
                minRows={5} />
        </Dialog>
    )
}

export default observer(ContentFormDialog);
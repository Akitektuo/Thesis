import { Dialog, NumberInput, TextInput } from "components";
import { useForceUpdate } from "infrastructure";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { PlainBadgeType } from "shared/types/badge-types";
import { BadgeFormDialogContext } from "./badge-form-dialog-store";
import styles from "./badge-form-dialog.module.scss";

interface Props {
    badge: PlainBadgeType | null | undefined;
    onSave: (badge: PlainBadgeType, isAdd: boolean) => void;
    onClose: () => void;
}

const BadgeFormDialog = ({ badge, onSave, onClose }: Props) => {
    useForceUpdate();

    const {
        badgeEdit,
        isAdd,
        shouldShow,
        validator,
        setBadge,
        setName,
        setImage,
        setPoints,
        handleSave
    } = useContext(BadgeFormDialogContext);

    useEffect(() => {
        setBadge(badge);
    }, [badge, setBadge]);

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
            title={isAdd ? "Create a new badge" : `Update badge ${badge?.name}`}
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
                value={badgeEdit.name}
                onChange={setName} />
            <TextInput
                validator={validator}
                fieldName="image"
                className={styles.input}
                label="Image"
                value={badgeEdit.image}
                onChange={setImage} />
            <NumberInput
                validator={validator}
                fieldName="points"
                className={styles.input}
                label="Points"
                value={badgeEdit.points}
                onChange={setPoints} />
        </Dialog>
    );
}

export default observer(BadgeFormDialog);
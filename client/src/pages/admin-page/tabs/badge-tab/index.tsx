import { Checkbox, AddButton } from "components";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import BadgeFormDialog from "./badge-form-dialog";
import BadgeGrid from "./badge-grid";
import { BadgeTabContext } from "./badge-tab-store";
import styles from "./badge-tab.module.scss";

const BadgeTab = () => {
    const {
        displayAsUnlocked,
        badgeEdit,
        setDisplayAsUnlocked,
        closeDialog,
        openAddDialog,
        openEditDialog,
        onSave,
        reset
    } = useContext(BadgeTabContext);

    useEffect(() => reset, [reset]);

    return <>
        <Checkbox
            className={styles.displayCheckbox}
            value={displayAsUnlocked}
            onChange={setDisplayAsUnlocked}
            label="Display as unlocked" />
        <div className={styles.grid}>
            <BadgeGrid onClick={openEditDialog} unlocked={displayAsUnlocked} />
        </div>
        <AddButton onClick={openAddDialog} />
        <BadgeFormDialog badge={badgeEdit} onClose={closeDialog} onSave={onSave} />
    </>;    
}

export default observer(BadgeTab);
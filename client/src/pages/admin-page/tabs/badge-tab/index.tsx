import { Checkbox, AddButton } from "components";
import { observer } from "mobx-react";
import { useContext } from "react";
import { BadgeTabContext } from "./badge-tab-store";
import styles from "./badge-tab.module.scss";

const BadgeTab = () => {
    const { displayAsUnlocked, setDisplayAsUnlocked } = useContext(BadgeTabContext);

    return <>
        <Checkbox
            className={styles.displayCheckbox}
            value={displayAsUnlocked}
            onChange={setDisplayAsUnlocked}
            label="Display as unlocked" />
        <div style={{marginLeft: "2rem"}}><strong>TODO</strong>: grid of badges</div>
        <AddButton />
    </>;    
}

export default observer(BadgeTab);
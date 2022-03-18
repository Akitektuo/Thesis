import AddIcon from "@mui/icons-material/AddSharp";
import CloseIcon from "@mui/icons-material/CloseSharp";
import { Fab } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import styles from "./add-button.module.scss";

interface Props {
    onClick?: () => void;
}

const AddButton = ({ onClick, children }: PropsWithChildren<Props>) => {
    const [ expand, setExpand ] = useState(false);

    const handleClick = () => {
        onClick?.();

        if (children)
            setExpand(!expand);
    }

    return <>
        {expand && (
            <div className={styles.expandContainer}>
                {children}
            </div>
        )}
        <Fab color="primary" className={styles.addButton} onClick={handleClick}>
            {expand ? (
                <CloseIcon />
            ) : (
                <AddIcon />
            )}
        </Fab>
    </>;
}

export default AddButton;
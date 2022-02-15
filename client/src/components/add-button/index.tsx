import AddIcon from "@mui/icons-material/AddSharp";
import { Fab } from "@mui/material";
import styles from "./add-button.module.scss";

interface Props {
    onClick?: () => void;
}

const AddButton = ({ onClick }: Props) => (
    <Fab color="primary" className={styles.addButton} onClick={onClick}>
        <AddIcon />
    </Fab>
);

export default AddButton;
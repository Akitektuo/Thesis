import { Avatar } from "@mui/material";
import stc from "string-to-color";
import styles from "./letter-avatar.module.scss";

interface Props {
    email: string;
}

const LetterAvatar = ({ email }: Props) => (
    <Avatar className={styles.avatar} sx={{ bgcolor: stc(email) }}>
        {email[0]}
    </Avatar>
);

export default LetterAvatar;
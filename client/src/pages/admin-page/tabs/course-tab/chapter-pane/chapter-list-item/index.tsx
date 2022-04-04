import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import classNames from "classnames";
import { PlainChapterType } from "shared/types/chapter-types";
import { IconButton } from "components";
import EditIcon from "@mui/icons-material/EditSharp";
import styles from "./chapter-list-item.module.scss";

interface Props extends PlainChapterType {
    showDivider?: boolean;
    highlight?: boolean;
    onClick?: (id: string) => void;
    onClickEdit?: (id: string) => void;
}

const ChapterListItem = ({
    id = "",
    name,
    points,
    level,
    showDivider,
    highlight,
    onClick,
    onClickEdit
}: Props) => <>
    {showDivider && (
        <Divider component="li" />
    )}
    <ListItem
        onClick={() => onClick?.(id)} 
        className={classNames(styles.container, {
            [styles.highlight]: highlight
        })}
        secondaryAction={
            <IconButton
                className={styles.editButton}
                title="Edit chapter"
                color="inherit"
                onClick={() => onClickEdit?.(id)}>
                <EditIcon />
            </IconButton>
        }>
        <ListItemAvatar>
            <Avatar>
                {points}
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} secondary={`Level ${level}`} />
    </ListItem>
</>;

export default ChapterListItem;
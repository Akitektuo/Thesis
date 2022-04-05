import { Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { IconButton, Text } from "components";
import { ContentTypeEnum, PlainContentType } from "shared/types/content-types";
import EditIcon from "@mui/icons-material/EditSharp";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import styles from "./content-list-item.module.scss";

interface Props extends PlainContentType {
    showDivider?: boolean;
    onClick?: (id: string) => void;
    onClickEdit?: (id: string) => void;
    onClickRemove?: (id: string) => void;
}

const ContentListItem = ({
    id = "",
    position,
    text,
    type,
    showDivider,
    onClick,
    onClickEdit,
    onClickRemove
}: Props) => <>
    {showDivider && (
        <Divider component="li" />
    )}
    <ListItem
        onClick={() => onClick?.(id)} 
        className={styles.container}
        secondaryAction={
            <div>
                <IconButton
                    className={styles.actionButton}
                    title="Edit content"
                    color="inherit"
                    onClick={() => onClickEdit?.(id)}>
                    <EditIcon />
                </IconButton>
                <IconButton
                    className={styles.actionButton}
                    title="Remove chapter"
                    color="inherit"
                    onClick={() => onClickRemove?.(id)}>
                    <RemoveIcon />
                </IconButton>
            </div>
        }>
        <ListItemAvatar>
            <Text variant="h4" isBold>{position}</Text>
        </ListItemAvatar>
        <ListItemText primary={text} secondary={type === ContentTypeEnum.TEXT ? "Text" : "Code"} />
    </ListItem>
</>;

export default ContentListItem;
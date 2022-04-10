import { Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { IconButton, Text } from "components";
import { ContentTypeEnum, PlainContentType } from "shared/types/content-types";
import { Draggable } from "react-beautiful-dnd";
import EditIcon from "@mui/icons-material/EditSharp";
import RemoveIcon from "@mui/icons-material/RemoveCircleOutlineSharp";
import styles from "./content-list-item.module.scss";
import classNames from "classnames";

interface Props extends PlainContentType {
    index: number;
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
    index,
    showDivider,
    onClick,
    onClickEdit,
    onClickRemove
}: Props) => (
    <Draggable draggableId={id} index={index}>
        {(provided, snapshot) => <>
            {showDivider && !snapshot.isDragging && (
                <Divider component="li" />
            )}
            <ListItem
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onClick={() => onClick?.(id)} 
                className={classNames(styles.container, {
                    [styles.dragged]: snapshot.isDragging
                })}
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
                <ListItemText
                    primaryTypographyProps={{ className: styles.content }}
                    primary={text}
                    secondary={type === ContentTypeEnum.TEXT ? "Text" : "Code"} />
            </ListItem>
        </>}
    </Draggable>
);

export default ContentListItem;
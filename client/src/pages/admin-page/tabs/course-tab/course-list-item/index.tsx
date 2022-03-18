import { Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import classNames from "classnames";
import { IconButton, Image, Text } from "components";
import { PlainCourseType } from "shared/types/course-types";
import EditIcon from '@mui/icons-material/EditSharp';
import styles from "./course-list-item.module.scss";

interface Props extends PlainCourseType {
    showDivider?: boolean;
    highlight?: boolean;
    onClick?: (id: string) => void;
    onClickEdit?: (id: string) => void;
}

const CourseListItem = ({
    id = "",
    name,
    image,
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
                title="Edit course"
                color="inherit"
                onClick={() => onClickEdit?.(id)}>
                <EditIcon />
            </IconButton>
        }>
        <ListItemAvatar>
            <Image className={styles.image} src={image} alt={name} />
        </ListItemAvatar>
        <ListItemText primary={
            <Text className={styles.name} variant="h5" isBold>{name}</Text>
        } />
    </ListItem>
</>;

export default CourseListItem;
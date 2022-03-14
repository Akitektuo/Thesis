import { Divider, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import classNames from "classnames";
import { Image, Text } from "components";
import { PlainCourseType } from "shared/types/course-types";
import styles from "./course-list-item.module.scss";

interface Props extends PlainCourseType {
    showDivider?: boolean;
    highlight?: boolean;
    onClick?: (id: string) => void;
}

const CourseListItem = ({ id, name, image, showDivider, highlight, onClick }: Props) => <>
    {showDivider && (
        <Divider component="li" />
    )}
    <ListItem onClick={() => onClick?.(id || "")} className={classNames(styles.container, {
        [styles.highlight]: highlight
    })}>
        <ListItemAvatar>
            <Image className={styles.image} src={image} alt={name} />
        </ListItemAvatar>
        <ListItemText primary={
            <Text className={styles.name} variant="h5" isBold>{name}</Text>
        } />
    </ListItem>
</>;

export default CourseListItem;
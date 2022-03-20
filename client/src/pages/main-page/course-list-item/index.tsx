import { Paper } from "@mui/material";
import { Image, Text } from "components";
import { DisplayCourseType } from "shared/types/course-types";
import styles from "./course-list-item.module.scss";

interface Props {
    course: DisplayCourseType;
    onClick?: (id: string) => void;
}

const CourseListItem = ({ course, onClick }: Props) => (
    <Paper className={styles.container} onClick={() => onClick?.(course.id)}>
        <Image className={styles.picture} src={course.image} alt={course.name} />
        <div className={styles.details}>
            <Text variant="h5" isBold >{course.name}</Text>
            <div className={styles.statistics}>
                <span className={styles.labelWithData}>
                    <Text>Points left to collect:</Text>
                    <Text isBold>{course.availablePoints}</Text>
                </span>
                <span className={styles.labelWithData}>
                    <Text>Completed chapters:</Text>
                    <Text isBold>{course.completedChapters}/{course.totalChapters}</Text>
                </span>
            </div>
        </div>
    </Paper>
);

export default CourseListItem;
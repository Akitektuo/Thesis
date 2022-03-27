import { Container } from "@mui/material";
import { Header, Text } from "components";
import { observer } from "mobx-react";
import { ROUTE_INDEX } from "pages/routes/constants";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChapterTree from "./chapter-tree";
import { CoursePageContext } from "./course-page-store";
import styles from "./course-page.module.scss";

const CoursePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { courseDetails, fetchCourseDetails } = useContext(CoursePageContext);

    useEffect(() => {
        fetchCourseDetails(id);
    }, [id, fetchCourseDetails]);

    if (!courseDetails)
        return null;

    const { name, completedChapters, totalChapters, rootChapter } = courseDetails;

    return (
        <Container>
            <Header title={`${name} (Course)`} onClickBack={() => navigate(ROUTE_INDEX)}>
                <Text className={styles.chaptersHeaderIndicator} variant="overline">
                    Completed chapters - {completedChapters}/{totalChapters}
                </Text>
            </Header>
            <ChapterTree rootChapter={rootChapter} />
        </Container>
    );
}

export default observer(CoursePage);
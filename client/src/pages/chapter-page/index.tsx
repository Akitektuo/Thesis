import { Container } from "@mui/material";
import { Header, Text } from "components";
import { observer } from "mobx-react";
import { ROUTE_COURSE } from "pages/routes/constants";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ChapterPageContext } from "./chapter-page-store";
import styles from "./chapter-page.module.scss";
import ContentList from "./content-list";

const ChapterPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { chapterDetails, fetchChapterDetails, reset } = useContext(ChapterPageContext);
    
    useEffect(() => {
        fetchChapterDetails(id ?? "");

        return reset;
    }, [id, fetchChapterDetails, reset]);

    if (!chapterDetails)
        return null;

    const { courseId, courseName, chapterName, points, approved, contents } = chapterDetails;

    return (
        <Container>
            <Header
                title={`${courseName} - ${chapterName}`}
                onClickBack={() => navigate(`${ROUTE_COURSE}/${courseId}`)}>
                <Text className={styles.pointsHeaderIndicator} variant="overline">
                    {approved ? "No available points" : `Available points - ${points}`}
                </Text>
            </Header>
            <ContentList contents={contents} />
        </Container>
    );
}

export default observer(ChapterPage);
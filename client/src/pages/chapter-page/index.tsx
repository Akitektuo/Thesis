import { Container, Paper } from "@mui/material";
import { Header, Text } from "components";
import { observer } from "mobx-react";
import { ROUTE_COURSE } from "pages/routes/constants";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import ActionButtons from "./action-buttons";
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

    const {
        courseId,
        courseName,
        chapterName,
        points,
        approved,
        contents,
        filesUrl
    } = chapterDetails;

    return (
        <Container>
            <Header
                title={`${courseName} - ${chapterName}`}
                onClickBack={() => navigate(`${ROUTE_COURSE}/${courseId}`)}>
                <Text className={styles.pointsHeaderIndicator} variant="overline">
                    {approved ? "No available points" : `Available points - ${points}`}
                </Text>
            </Header>
            <Paper elevation={4} className={styles.content}>
                <ContentList contents={contents} />
                <ActionButtons 
                    filesName={`${courseName}_${chapterName}.zip`} 
                    filesUrl={filesUrl} 
                    className={styles.actions} />
            </Paper>
        </Container>
    );
}

export default observer(ChapterPage);
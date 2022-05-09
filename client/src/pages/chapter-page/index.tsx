import { Container, Paper } from "@mui/material";
import { Header, Text, UploadDialog } from "components";
import { observer } from "mobx-react";
import { ROUTE_COURSE } from "pages/routes/constants";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import ActionButtons from "./action-buttons";
import { ChapterPageContext } from "./chapter-page-store";
import styles from "./chapter-page.module.scss";
import ContentList from "./content-list";
import SolutionResult from "./solution-result";

const ChapterPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        chapterDetails,
        initialApproved,
        isUploadDialogOpen,
        fetchChapterDetails,
        openUploadDialog,
        closeUploadDialog,
        handleUpload,
        reset
    } = useContext(ChapterPageContext);
    
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
        filesUrl,
        message
    } = chapterDetails;

    return <>
        <Container>
            <Header
                title={`${courseName} - ${chapterName}`}
                onClickBack={() => navigate(`${ROUTE_COURSE}/${courseId}`)}>
                <Text className={styles.pointsHeaderIndicator} variant="overline">
                    {approved || initialApproved ? "No available points" : `Available points - ${points}`}
                </Text>
            </Header>
            <Paper elevation={4} className={styles.content}>
                <ContentList contents={contents} />
                <ActionButtons 
                    filesName={`${courseName}_${chapterName}.zip`} 
                    filesUrl={filesUrl} 
                    className={styles.actions}
                    onClickTestSolution={openUploadDialog} />
            </Paper>
            <SolutionResult className={styles.solutionResult} approved={approved} message={message} />
        </Container>
        <UploadDialog 
            isOpen={isUploadDialogOpen} 
            onCancel={closeUploadDialog} 
            title="Upload your solution as .zip"
            onUpload={file => handleUpload(id ?? "", file)} />
    </>;
}

export default observer(ChapterPage);
import { Dialog, RenderContent } from "components";
import { observer } from "mobx-react";
import { useContext, useEffect } from "react";
import { PlainChapterType } from "shared/types/chapter-types";
import { ContentTypeEnum, PlainContentType } from "shared/types/content-types";
import ChapterList from "./chapter-list";
import { ChapterPaneContext } from "./chapter-pane-store";
import styles from "./chapter-pane.module.scss";
import ContentList from "./content-list";

interface Props {
    courseId?: string;
    chapterId?: string;
    highlightChapter?: (chapter: PlainChapterType) => boolean;
    onClickChapter?: (id: string) => void;
    onClickChapterEdit?: (chapter: PlainChapterType) => void;
    onClickContentEdit?: (content: PlainContentType) => void;
}

const ChapterPane = ({
    courseId,
    chapterId,
    highlightChapter,
    onClickChapter,
    onClickChapterEdit,
    onClickContentEdit
}: Props) => {
    const {
        contentToDelete,
        contentToShow,
        closeConfirmDialog,
        openConfirmDialog,
        closeDetailsDialog,
        openDetailsDialog,
        handleConfirm,
        reset
    } = useContext(ChapterPaneContext);

    useEffect(() => reset, [reset]);
    
    const contentTypeName = contentToDelete?.type === ContentTypeEnum.TEXT ? "text" : "code";

    return <>
        <div className={styles.pane}>
            <ChapterList
                courseId={courseId}
                highlightChapter={highlightChapter}
                onClick={onClickChapter}
                onClickEdit={onClickChapterEdit} />
        </div>
        <div className={styles.pane}>
            <ContentList
                chapterId={chapterId}
                onClick={openDetailsDialog}
                onClickEdit={onClickContentEdit}
                onClickRemove={openConfirmDialog} />
        </div>
        <Dialog
            isOpen={!!contentToDelete}
            onClose={closeConfirmDialog}
            title={`Are you sure you want to delete this ${contentTypeName} content?`}
            primaryButtonLabel="Confirm"
            secondaryButtonLabel="Cancel"
            onPrimaryClick={handleConfirm}>
            {contentToDelete?.text}
        </Dialog>
        <Dialog
            isOpen={!!contentToShow}
            onClose={closeDetailsDialog}
            title={`Content on position ${contentToShow?.position}`}
            className={styles.dialog}
            secondaryButtonLabel="Close">
            {!!contentToShow && (
                <RenderContent {...contentToShow} />
            )}
        </Dialog>
    </>;
}

export default observer(ChapterPane);
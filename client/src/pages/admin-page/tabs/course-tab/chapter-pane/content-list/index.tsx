import { List } from "@mui/material";
import { useContext, useEffect } from "react";
import { PlainContentType } from "shared/types/content-types";
import { ContentListContext } from "./content-list-store";
import sharedStyles from "shared/styles/common.module.scss";
import { observer } from "mobx-react";
import ContentListItem from "../content-list-item";
import { DragDropContext, Droppable, DroppableProvided, DropResult } from "react-beautiful-dnd";

interface Props {
    chapterId?: string;
    onClick?: (content: PlainContentType) => void;
    onClickEdit?: (content: PlainContentType) => void;
    onClickRemove?: (content: PlainContentType) => void;
}

interface ObserverListProps extends Props {
    provided: DroppableProvided;
}

const ObserverList = observer(({
    provided,
    onClick,
    onClickEdit,
    onClickRemove
}: ObserverListProps) => {
    const { contents } = useContext(ContentListContext);

    return (
        <List
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={sharedStyles.scrollable}>
            {contents.map((content, index) => (
                <ContentListItem
                    key={content.id}
                    index={index}
                    showDivider={!!index}
                    onClick={() => onClick?.(content)}
                    onClickEdit={() => onClickEdit?.(content)}
                    onClickRemove={() => onClickRemove?.(content)}
                    {...content} />
            ))}
            {provided.placeholder}
        </List>
    );
});

const ContentList = ({ chapterId = "", onClick, onClickEdit, onClickRemove }: Props) => {
    const { fetchContents, reorder } = useContext(ContentListContext);

    useEffect(() => {
        fetchContents(chapterId);
    }, [chapterId, fetchContents]);

    const handleDragEnd = ({ destination, source }: DropResult) => {
        if (!destination)
            return;

        reorder(chapterId, destination.index, source.index);
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="content-droppable-list">
                {provided => (
                    <ObserverList
                        provided={provided}
                        onClick={onClick}
                        onClickEdit={onClickEdit}
                        onClickRemove={onClickRemove} />
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default ContentList;
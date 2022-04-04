import { List } from "@mui/material";
import { useContext, useEffect } from "react";
import { PlainContentType } from "shared/types/content-types";
import { ContentListContext } from "./content-list-store";
import sharedStyles from "shared/styles/common.module.scss";
import { observer } from "mobx-react";
import ContentListItem from "../content-list-item";

interface Props {
    chapterId?: string;
    onClick?: (content: PlainContentType) => void;
    onClickEdit?: (content: PlainContentType) => void;
    onClickRemove?: (content: PlainContentType) => void;
}

const ContentList = ({ chapterId = "", onClick, onClickEdit, onClickRemove }: Props) => {
    const { contents, fetchContents } = useContext(ContentListContext);

    useEffect(() => {
        fetchContents(chapterId);
    }, [chapterId, fetchContents]);

    return (
        <List className={sharedStyles.scrollable}>
            {contents.map((content, index) => (
                <ContentListItem
                    key={content.id}
                    showDivider={!!index}
                    onClick={() => onClick?.(content)}
                    onClickEdit={() => onClickEdit?.(content)}
                    onClickRemove={() => onClickRemove?.(content)}
                    {...content} />
            ))}
        </List>
    );
}

export default observer(ContentList);
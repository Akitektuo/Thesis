import { Divider, Paper } from "@mui/material";
import { RenderContent } from "components";
import { DisplayContentType } from "shared/types/content-types";
import styles from "./content-list.module.scss";

interface Props {
    contents: DisplayContentType[];
}

const ContentList = ({ contents }: Props) => (
    <Paper elevation={4} className={styles.contentList}>
        {contents.map(({ text, type }, index) => <>
            {!!index && (
                <Divider />
            )}
            <RenderContent text={text} type={type}  />
        </>)}
    </Paper>
);

export default ContentList;
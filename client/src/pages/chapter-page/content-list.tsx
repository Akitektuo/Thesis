import { Divider } from "@mui/material";
import { RenderContent } from "components";
import { DisplayContentType } from "shared/types/content-types";

interface Props {
    contents: DisplayContentType[];
}

const ContentList = ({ contents }: Props) => <>
    {contents.map(({ text, type }, index) => (
        <div key={index}>
            <RenderContent text={text} type={type}  />
            <Divider />
        </div>
    ))}
</>;

export default ContentList;
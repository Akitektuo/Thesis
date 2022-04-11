import classNames from "classnames";
import Text from "components/text";
import { ContentTypeEnum, DisplayContentType } from "shared/types/content-types";
import styles from "./render-content.module.scss";

const RenderContent = ({ type, text }: DisplayContentType) => (
    <Text formatAsHtml className={classNames(styles.content, {
        [styles.isCode]: type === ContentTypeEnum.CODE
    })}>
        {text}
    </Text>
);

export default RenderContent;
import { Button } from "@mui/material";
import classNames from "classnames";
import { downloadFile } from "helpers/url-helper";
import styles from "./action-buttons.module.scss";

interface Props {
    filesName: string;
    filesUrl: string;
    onClickTestSolution: () => void;
    className?: string;
}

const ActionButtons = ({ filesName, filesUrl, onClickTestSolution, className }: Props) => {
    const handleDownloadFiles = () => downloadFile(filesUrl, filesName);

    return <>
        <div className={classNames(styles.actionButtons, className)}>
            <Button variant="contained" onClick={handleDownloadFiles}>Download files</Button>
            <Button variant="contained" onClick={onClickTestSolution}>Test solution</Button>
        </div>
    </>;
}

export default ActionButtons;
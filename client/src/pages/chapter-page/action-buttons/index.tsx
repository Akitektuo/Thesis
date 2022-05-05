import { Button } from "@mui/material";
import classNames from "classnames";
import { downloadUrl } from "helpers/url-helper";
import styles from "./action-buttons.module.scss";

interface Props {
    filesName: string;
    filesUrl: string;
    className?: string;
}

const ActionButtons = ({ filesName, filesUrl, className }: Props) => {
    const handleDownloadFiles = () => {
        console.log(filesUrl);
        downloadUrl(filesUrl, filesName);
    }

    return (
        <div className={classNames(styles.actionButtons, className)}>
            <Button variant="contained" onClick={handleDownloadFiles}>Download files</Button>
            <Button variant="contained">Test solution</Button>
        </div>
    );
}

export default ActionButtons;
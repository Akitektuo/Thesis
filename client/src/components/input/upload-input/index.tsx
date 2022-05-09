import { Button } from "@mui/material";
import Text from "components/text";
import { generateUid } from "helpers/random";
import { useRef } from "react";
import styles from "./upload-input.module.scss";

interface Props {
    value: File[];
    onChange: (files: File[]) => void;
    label?: string;
    className?: string;
    acceptWildcard?: string;
    multipleFiles?: boolean;
    defaultValue?: string;
}

const UploadInput = ({
    value,
    onChange,
    label,
    className,
    acceptWildcard = "*",
    multipleFiles,
    defaultValue
}: Props) => {
    const uid = useRef(generateUid());

    const inputId = `upload-input-label-${uid.current}`;
    const fileNames = value.joinBy(({ name }) => name) || defaultValue;

    const handleInput = (event: any) => onChange(Array.from(event.target.files));

    return (
        <div className={className}>
            {!!label && (
                <Text isBold variant="subtitle2">{label}</Text>
            )}
            <div className={styles.uploadDetails}>
                <Text className={styles.selectedFiles}>
                    Selected files: <b>{fileNames || <i>None</i>}</b>
                </Text>
                <label htmlFor={inputId}>
                    <input
                        className={styles.hidden}
                        id={inputId}
                        accept={acceptWildcard}
                        multiple={multipleFiles}
                        type="file"
                        onInput={handleInput} />
                    <Button variant="outlined" component="span">
                        Choose file{multipleFiles && "s"}
                    </Button>
                </label>
            </div>
        </div>
    );
}

export default UploadInput;
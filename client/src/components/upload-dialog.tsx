import { Dialog, UploadInput } from "components";
import { useEffect, useState } from "react";

interface Props {
    isOpen: boolean;
    onCancel: () => void;
    onUpload: (file: File) => void;
    title?: string;
}

const UploadDialog = ({ isOpen, onCancel, onUpload, title = "Upload file" }: Props) => {
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        if (isOpen)
            setFiles([]);
    }, [isOpen]);

    const handleUpload = () => onUpload(files[0]);

    return (
        <Dialog
            isOpen={isOpen}
            title={title}
            primaryButtonLabel="Upload"
            onClose={onCancel}
            onPrimaryClick={handleUpload}
            isPrimaryDisabled={!files.length}>
            <UploadInput acceptWildcard=".zip" value={files} onChange={setFiles} />
        </Dialog>
    );
}

export default UploadDialog;
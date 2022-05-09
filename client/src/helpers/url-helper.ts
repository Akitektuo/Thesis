import { downloadDocument } from "accessor/document-accessor";

export const downloadFile = async (internalFileName: string, fileName: string) => {
    const file = await downloadDocument(internalFileName);

    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    link.click();
}
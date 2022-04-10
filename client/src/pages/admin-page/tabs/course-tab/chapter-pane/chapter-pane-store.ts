import { deleteContent } from "accessor/content-accessor";
import { loadingService, toastService } from "infrastructure";
import { makeAutoObservable } from "mobx";
import { createContext } from "react";
import { ContentTypeEnum, PlainContentType } from "shared/types/content-types";
import { contentListStore } from "./content-list/content-list-store";

export class ChapterPaneStore {
    public contentToDelete: PlainContentType | null = null;
    public contentToShow: PlainContentType | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    public closeConfirmDialog = () => this.contentToDelete = null;

    public openConfirmDialog = (content: PlainContentType) => this.contentToDelete = content;

    public closeDetailsDialog = () => this.contentToShow = null;

    public openDetailsDialog = (content: PlainContentType) => this.contentToShow = content;

    public handleConfirm = async () => {
        if (!this.contentToDelete)
            return;

        loadingService.setLoading(true);

        try {
            await deleteContent(this.contentToDelete?.id || "");
            
            const contentTypeName =
                this.contentToDelete.type === ContentTypeEnum.TEXT ? "Text" : "Code";

            contentListStore.removeContent(this.contentToDelete);
            toastService.showSuccess(`${contentTypeName} content removed successfully!`);
            loadingService.setLoading(false);
            this.closeConfirmDialog();
        } catch (error: any) {
            toastService.showError(error);
            loadingService.setLoading(false);
        }
    }

    public reset = () => {
        this.closeConfirmDialog();
        this.closeDetailsDialog();
    }
}

export const chapterPaneStore = new ChapterPaneStore();
export const ChapterPaneContext = createContext(chapterPaneStore);
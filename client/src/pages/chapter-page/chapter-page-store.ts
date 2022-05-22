import { getChapter, postChapterSolution } from "accessor/chapter-accessor";
import { uploadDocument } from "accessor/document-accessor";
import { loadingService, navigationService, toastService } from "infrastructure";
import { makeAutoObservable, runInAction } from "mobx";
import { ROUTE_INDEX } from "pages/routes/constants";
import { createContext } from "react";
import { ChapterDetailsType } from "shared/types/chapter-types";

export class ChapterPageStore {
    public chapterDetails: ChapterDetailsType | null = null;
    public initialApproved: boolean = false;
    public isUploadDialogOpen: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    public fetchChapterDetails = async (id: string) => {
        loadingService.setLoading(true);

        try {
            const chapterDetails = await getChapter(id);
            runInAction(() => {
                this.chapterDetails = chapterDetails;
                this.initialApproved = chapterDetails.approved;
            });
        } catch (error: any) {
            this.showErrorAndRedirect(error);
        }

        loadingService.setLoading(false);
    }

    private showErrorAndRedirect = (error: string) => {
        toastService.showError(error);
        loadingService.setLoading(false);
        navigationService.to(ROUTE_INDEX);
    }

    public openUploadDialog = () => this.isUploadDialogOpen = true;

    public closeUploadDialog = () => this.isUploadDialogOpen = false;

    public handleUpload = async (chapterId: string, file: File) => {
        loadingService.setLoading(true);

        try {
            const fileName = await uploadDocument(file);
            const { approved, message } = await postChapterSolution(chapterId, fileName);

            this.closeUploadDialog();
            toastService.showSuccess("Your solution was uploaded!");
            runInAction(() => {
                if (!this.chapterDetails)
                    return;

                this.chapterDetails.approved = approved;
                this.chapterDetails.message = message;
            });

            loadingService.setLoading(false);
        } catch (error: any) {
            toastService.showError(error);
            loadingService.setLoading(false);
        }
    }

    public reset = () => {
        this.chapterDetails = null;
        this.initialApproved = false;
        this.isUploadDialogOpen = false;
    }
}

export const chapterPageStore = new ChapterPageStore();
export const ChapterPageContext = createContext(chapterPageStore);
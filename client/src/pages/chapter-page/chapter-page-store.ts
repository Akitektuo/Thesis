import { getChapter } from "accessor/chapter-accessor";
import { loadingService, navigationService, toastService } from "infrastructure";
import { makeAutoObservable, runInAction } from "mobx";
import { ROUTE_INDEX } from "pages/routes/constants";
import { createContext } from "react";
import { ChapterDetailsType } from "shared/types/chapter-types";

export class ChapterPageStore {
    public chapterDetails: ChapterDetailsType | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    public fetchChapterDetails = async (id: string) => {
        loadingService.setLoading(true);

        try {
            const chapterDetails = await getChapter(id);
            runInAction(() => this.chapterDetails = chapterDetails);
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

    public reset = () => {
        this.chapterDetails = null;
    }
}

export const chapterPageStore = new ChapterPageStore();
export const ChapterPageContext = createContext(chapterPageStore);
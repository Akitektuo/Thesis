import { getAllContents, rearrangeContents } from "accessor/content-accessor";
import { loadingService } from "infrastructure";
import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import { PlainContentType } from "shared/types/content-types";

export class ContentListStore {
    public contents: PlainContentType[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public fetchContents = async (chapterId: string) => {
        if (!chapterId)
            return this.contents = [];

        loadingService.setLoading(true);

        const contents = await getAllContents(chapterId);
        runInAction(() => this.contents = contents);

        loadingService.setLoading(false);
    }

    public addContent = (content: PlainContentType) => this.contents.push(content);

    public updateContent = (content: PlainContentType) =>
        this.contents.update(content, ({ id }) => id === content.id);

    public removeContent = (content: PlainContentType) =>
        this.contents = this.contents.filter(({ id }) => id !== content.id);

    public reorder = async (chapterId: string, from: number, to: number) => {
        loadingService.setLoading(true);

        const rearrangeDetails = this.contents.swap(from, to).map((element, index) => {
            element.position = index;

            return {
                id: element.id ?? "",
                position: index
            };
        });
        await rearrangeContents(chapterId, rearrangeDetails);

        loadingService.setLoading(false);
    }
}

export const contentListStore = new ContentListStore();
export const ContentListContext = createContext(contentListStore);
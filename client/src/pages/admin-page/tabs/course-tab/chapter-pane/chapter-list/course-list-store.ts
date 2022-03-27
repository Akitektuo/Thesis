import { getAllChapters } from "accessor/chapter-accessor";
import { loadingService } from "infrastructure";
import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import { PlainChapterType } from "shared/types/chapter-types";

export class ChapterListStore {
    public chapters: PlainChapterType[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    public fetchChapters = async (courseId: string) => {
        if (!courseId)
            return this.chapters = [];

        loadingService.setLoading(true);

        const chapters = await getAllChapters(courseId);
        runInAction(() => this.chapters = chapters);
        
        loadingService.setLoading(false);
    }

    public addChapter = (chapter: PlainChapterType) => this.chapters.push(chapter);

    public updateChapter = (chapter: PlainChapterType) =>
        this.chapters.update(chapter, ({ id }) => id === chapter.id);
}

export const chapterListStore = new ChapterListStore();
export const ChapterListContext = createContext(chapterListStore);
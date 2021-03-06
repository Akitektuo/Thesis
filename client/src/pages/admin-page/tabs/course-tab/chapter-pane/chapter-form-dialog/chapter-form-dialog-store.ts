import { createChapter, updateChapter } from "accessor/chapter-accessor";
import { uploadDocument } from "accessor/document-accessor";
import { loadingService, toastService } from "infrastructure";
import { makeAutoObservable, runInAction, toJS } from "mobx";
import { createContext } from "react";
import { InputNumber } from "shared/types";
import {
    EMPTY_INPUT_PLAIN_CHAPTER,
    InputPlainChapterType,
    PlainChapterType,
    toPlainChapter
} from "shared/types/chapter-types";
import { makeValidator, Validator } from "validation";
import { courseTabStore } from "../../course-tab-store";
import ChapterFormDialogRules from "./chapter-form-dialog-rules";

export class ChapterFormDialogStore {
    public chapterEdit: InputPlainChapterType = EMPTY_INPUT_PLAIN_CHAPTER;
    public file: File | null = null;
    public shouldShow: boolean = false;
    public isAdd: boolean = true;

    public validator: Validator<InputPlainChapterType>;

    constructor() {
        makeAutoObservable(this);
        this.validator = makeValidator(this.chapterEdit, ChapterFormDialogRules);
    }

    public setChapter = (chapter: PlainChapterType | null | undefined) => {
        if (chapter === undefined)
            return this.shouldShow = false;

        this.setChapterEdit(chapter ?? EMPTY_INPUT_PLAIN_CHAPTER);
        this.isAdd = chapter === null;
        this.shouldShow = true;
    }

    private setChapterEdit = (fromChapter: InputPlainChapterType) => {
        this.chapterEdit = toJS(fromChapter);
        this.file = null;
        this.chapterEdit.courseId = courseTabStore.selectedCourse;
        this.validator = makeValidator(this.chapterEdit, ChapterFormDialogRules);
    }

    public setName = (name: string) => this.chapterEdit.name = name;

    public setPoints = (points: InputNumber) => this.chapterEdit.points = points;

    public setLevel = (level: InputNumber) => this.chapterEdit.level = level;

    public setParentChapter = (parentChapter: string | null) => {
        if (parentChapter)
            return this.chapterEdit.parentChapterId = parentChapter;
        
        delete this.chapterEdit.parentChapterId;
    }

    public setFile = (file: File | undefined) => this.file = file ?? null;

    public handleSave = async () => {
        this.validator.validate();
        if (!this.validator.isValid())
            return;

        loadingService.setLoading(true);
        const apiCall = this.isAdd ? createChapter : updateChapter;

        try {
            if (this.file) {
                const fileName = await uploadDocument(this.file);
                runInAction(() => this.chapterEdit.fileName = fileName);
            }

            const result = await apiCall(toPlainChapter(this.chapterEdit));

            const actionName = this.isAdd ? "created" : "updated";
            toastService.showSuccess(
                `Course '${this.chapterEdit.name}' ${actionName} successfully!`);
            loadingService.setLoading(false);
            
            return result;
        } catch (error: any) {
            toastService.showError(error);
            loadingService.setLoading(false);
        }
    }
}

export const chapterFormDialogStore = new ChapterFormDialogStore();
export const ChapterFormDialogContext = createContext(chapterFormDialogStore);
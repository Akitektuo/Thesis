import { createContent, updateContent } from "accessor/content-accessor";
import { loadingService, toastService } from "infrastructure";
import { makeAutoObservable, toJS } from "mobx";
import { createContext } from "react";
import {
    ContentTypeEnum,
    EMPTY_PLAIN_CONTENT,
    PlainContentType
} from "shared/types/content-types";
import { makeValidator, Validator } from "validation";
import { courseTabStore } from "../../course-tab-store";
import { contentListStore } from "../content-list/content-list-store";
import ContentFormDialogRules from "./content-form-dialog-rules";

export class ContentFormDialogStore {
    public contentEdit: PlainContentType = EMPTY_PLAIN_CONTENT;
    public shouldShow: boolean = false;
    public isAdd: boolean = true;

    public validator: Validator<PlainContentType>;

    constructor() {
        makeAutoObservable(this);
        this.validator = makeValidator(this.contentEdit, ContentFormDialogRules);
    }

    public setContent = (content: PlainContentType | null | undefined) => {
        if (content === undefined)
            return this.shouldShow = false;

        this.isAdd = content === null;
        this.setContentEdit(content ?? EMPTY_PLAIN_CONTENT);
        this.shouldShow = true;
    }

    private setContentEdit = (fromContent: PlainContentType) => {
        this.contentEdit = toJS(fromContent);

        console.log(this.isAdd)
        if (this.isAdd)
            this.contentEdit.position = contentListStore.contents.length;

        this.contentEdit.chapterId = courseTabStore.selectedChapter;
        this.validator = makeValidator(this.contentEdit, ContentFormDialogRules);
    }

    public setText = (text: string) => this.contentEdit.text = text;

    public setType = (type: ContentTypeEnum) => this.contentEdit.type = type;

    public handleSave = async () => {
        this.validator.validate();
        if (!this.validator.isValid())
            return;

        loadingService.setLoading(true);
        const apiCall = this.isAdd ? createContent : updateContent;

        try {
            const result = await apiCall(this.contentEdit);

            const actionName = this.isAdd ? "created" : "updated";
            const contentTypeName =
                this.contentEdit.type === ContentTypeEnum.TEXT ? "Text" : "Code";

            toastService.showSuccess(
                `${contentTypeName} content ${actionName} successfully!`);
            loadingService.setLoading(false);
            
            return result;
        } catch (error: any) {
            toastService.showError(error);
            loadingService.setLoading(false);
        }
    }
}

export const contentFormDialogStore = new ContentFormDialogStore();
export const ContentFormDialogContext = createContext(contentFormDialogStore);
export enum ContentTypeEnum {
    TEXT = 0,
    CODE = 1
}

export interface PlainContentType {
    id?: string;
    chapterId: string;
    type: ContentTypeEnum;
    position: number;
    text: string;
}

export const EMPTY_PLAIN_CONTENT: PlainContentType = {
    chapterId: "",
    type: ContentTypeEnum.TEXT,
    position: 0,
    text: ""
};

export interface DisplayContentType {
    type: ContentTypeEnum;
    text: string;
}
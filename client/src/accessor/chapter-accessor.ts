import { 
    ChapterDetailsType, 
    ChapterSolutionResultType, 
    PlainChapterType 
} from "shared/types/chapter-types";
import { BASE_URL } from "./constants";
import { httpGet, httpPost, httpPut } from "./helper-functions";

const URL = `${BASE_URL}chapters`;

export const createChapter = (chapter: PlainChapterType) =>
    httpPost<PlainChapterType>(URL, chapter);

export const updateChapter = (chapter: PlainChapterType) =>
    httpPut<PlainChapterType>(URL, chapter);

export const getAllChapters = (courseId: string) =>
    httpGet<PlainChapterType[]>(`${URL}/allForCourse/${courseId}`);

export const getChapter = (chapterId: string) =>
    httpGet<ChapterDetailsType>(`${URL}/${chapterId}`);

export const postChapterSolution = (chapterId: string, fileName: string) =>
    httpPost<ChapterSolutionResultType>(`${URL}/${chapterId}?fileName=${fileName}`);
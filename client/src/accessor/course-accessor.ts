import { DisplayCourseType, PlainCourseType } from "shared/types/course-types";
import { BASE_URL } from "./constants";
import { httpGet, httpPost, httpPut } from "./helper-functions";

const URL = `${BASE_URL}courses`;

export const createCourse = (course: PlainCourseType) => httpPost<PlainCourseType>(URL, course);

export const updateCourse = (course: PlainCourseType) => httpPut<PlainCourseType>(URL, course);

export const getAllCourses = () => httpGet<PlainCourseType[]>(`${URL}/all`);

export const getAllCoursesForUser = () => httpGet<DisplayCourseType[]>(`${URL}/userAll`);

export const getCourse = (id: string) => httpGet<any>(`${URL}/${id}`);
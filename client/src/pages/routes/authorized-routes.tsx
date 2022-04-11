import BadgesPage from "pages/badges-page";
import ChapterPage from "pages/chapter-page";
import CoursePage from "pages/course-page";
import MainPage from "pages/main-page";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./admin-routes";
import { ROUTE_ADMIN, ROUTE_BADGES, ROUTE_CHAPTER, ROUTE_COURSE, ROUTE_INDEX } from "./constants";

const AuthorizedRoutes = () => (
    <Routes>
        <Route path={ROUTE_ADMIN} element={<AdminRoutes />} />
        <Route path={ROUTE_BADGES} element={<BadgesPage />} />
        <Route path={`${ROUTE_COURSE}/:id`} element={<CoursePage />} />
        <Route path={`${ROUTE_CHAPTER}/:id`} element={<ChapterPage />} />
        <Route path={ROUTE_INDEX} element={<MainPage />} />
        <Route path="*" element={<Navigate to={ROUTE_INDEX} />} />
    </Routes>
);

export default AuthorizedRoutes;
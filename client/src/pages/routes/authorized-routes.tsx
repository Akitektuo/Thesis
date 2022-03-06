import BadgesPage from "pages/badges-page";
import MainPage from "pages/main-page";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminRoutes from "./admin-routes";
import { ROUTE_ADMIN, ROUTE_BADGES, ROUTE_INDEX } from "./constants";

const AuthorizedRoutes = () => (
    <Routes>
        <Route path={ROUTE_ADMIN} element={<AdminRoutes />} />
        <Route path={ROUTE_BADGES} element={<BadgesPage />} />
        <Route path={ROUTE_INDEX} element={<MainPage />} />
        <Route path="*" element={<Navigate to={ROUTE_INDEX} />} />
    </Routes>
);

export default AuthorizedRoutes;